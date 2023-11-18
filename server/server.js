require("dotenv").config()

let cors = require("cors")

const express = require("express")
const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static("public"))
const port = process.env.PORT || 4000;

const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY)

app.post("/checkout", async (req, res) => {
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            success_url: `${process.env.SUCCESS_URL}`,
            cancel_url: `${process.env.CANCEL_URL}`,
            line_items: req.body.items.map((item) => {
                return{
                    price_data: {
                        currency: "gbp",
                        product_data: {
                            name: item.name,
                            images: [item.image],
                            description: `Size: ${item.size.toUpperCase()}, Colour: ${item.colour}`
                        },
                        unit_amount: parseInt((item.price.toFixed(2) * 100).toFixed(2)) ,
                    },
                    quantity: item.quantity
                }
            }),
            shipping_options: req.body.shipping.map((rate) => {
                return {
                    shipping_rate_data: {
                      type: 'fixed_amount',
                      fixed_amount: {
                        amount: (parseFloat(rate.price).toFixed(2) * 100),
                        currency: 'gbp',
                      },
                      display_name: rate.name,
                      delivery_estimate: {
                        minimum: {
                          unit: 'business_day',
                          value: parseInt(rate.shipMin),
                        },
                        maximum: {
                          unit: 'business_day',
                          value: parseInt(rate.shipMax),
                        },
                      },
                    },
                  }
            }),
            shipping_address_collection: {
              allowed_countries: [
                "US", // United States
                "CA", // Canada
                "GB", // United Kingdom
                "AU", // Australia
                "FR", // France
                "DE", // Germany
                "IT", // Italy
                "ES", // Spain
                "JP", // Japan
                "CN", // China
                "IN", // India
                "BR", // Brazil
                "MX", // Mexico
                "RU", // Russia
                "ZA", // South Africa
                "NG", // Nigeria
                "EG", // Egypt
                "AR", // Argentina
                "NZ", // New Zealand
                "BE", // Belgium
                "NL", // Netherlands
                "SE", // Sweden
                "NO", // Norway
                "DK", // Denmark
                "FI", // Finland
                "AT", // Austria
                "CH", // Switzerland
                "PT", // Portugal
                "GR", // Greece
                "PL", // Poland
                "CZ", // Czech Republic
                "HU", // Hungary
                "RO", // Romania
                "BG", // Bulgaria
                "SK", // Slovakia
                "SI", // Slovenia
                "HR", // Croatia
                "RS", // Serbia
                "UA", // Ukraine
                "TR", // Turkey
                "IE", // Ireland
                "LU", // Luxembourg
                "CY", // Cyprus
                "EE", // Estonia
                "LV", // Latvia
                "LT", // Lithuania
                "MT", // Malta
                "IS", // Iceland
                "MC", // Monaco
                "LI", // Liechtenstein
                // Add more country codes as needed
              ]
            }
        })
        res.json({url: session.url})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

app.listen(port)