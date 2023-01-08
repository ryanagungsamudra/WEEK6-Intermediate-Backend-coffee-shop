const { check, validationResult } = require('express-validator')

// PRODUCT
    // RULES
    const rulesProduct = [
        check('title')
            .notEmpty().withMessage('The title of product cannot empty')
            .trim()
            .escape(),

        check('img')
            .notEmpty().withMessage('The image of product cannot empty')
            .trim()
            .escape(),

        check('category')
            .notEmpty().withMessage('The category of product cannot empty')
            .trim()
            .escape(),

        check('price')
            .notEmpty().withMessage('The price of product cannot empty')
            .isNumeric().withMessage('The price of product must be a numeric')
            .trim()
            .escape(),
    ]
    // RESPONSE AND CONDITION
    const product = [
        //Rules
        rulesProduct,

        //Response
        (req, res, next) => {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array()[0].msg })
            }
            next();
        }
    ]

// PRODUCT DETAIL/ORDER
    // RULES
    const rulesProductDetail = [
        check('title')
            .notEmpty().withMessage('The title of product cannot empty')
            .trim()
            .escape(),

        check('price')
            .notEmpty().withMessage('The price of product cannot empty')
            .isNumeric().withMessage('The price of product must be a numeric')
            .trim()
            .escape(),

        check('img')
            .notEmpty().withMessage('The image of product cannot empty')
            .trim()
            .escape(),

        check('category')
            .notEmpty().withMessage('The category of product cannot empty')
            .trim()
            .escape(),

        check('size')
            .notEmpty().withMessage('The size of product cannot empty')
            .trim()
            .escape(),

        check('quantity')
            .notEmpty().withMessage('The quantity of product cannot empty')
            .trim()
            .escape(),

        check('delivery')
            .notEmpty().withMessage('The delivery of product cannot empty')
            .trim()
            .escape(),

        check('time')
            .notEmpty().withMessage('The time of product cannot empty')
            .trim()
            .escape(),
    ]
    // RESPONSE AND CONDITION
    const productDetail = [
        //Rules
        rulesProductDetail,

        //Response
        (req, res, next) => {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array()[0].msg })
            }
            next();
        }
    ]

// USERS
    // RULES
    const rulesUsers = [
        check('email')
            .notEmpty().withMessage('email cannot empty')
            .trim()
            .escape(),

        check('password')
            .notEmpty().withMessage('password cannot empty')
            .isNumeric().withMessage('password must be a numeric')
            .trim()
            .escape(),

        check('mobile_number')
            .notEmpty().withMessage('mobile number cannot empty')
            .isNumeric().withMessage('mobile number must be a numeric')
            .trim()
            .escape(),

        check('name')
            .notEmpty().withMessage('name cannot empty')
            .trim()
            .escape(),

        check('gender')
            .notEmpty().withMessage('gender cannot empty')
            .trim()
            .escape(),

        check('birthdate')
            .notEmpty().withMessage('birthdate cannot empty')
            .trim()
            .escape(),

        check('address')
            .notEmpty().withMessage('address cannot empty')
            .trim()
            .escape(),
    ]
    // RESPONSE AND CONDITION
    const users = [
        //Rules
        rulesUsers,

        //Response
        (req, res, next) => {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array()[0].msg })
            }
            next();
        }
    ]

module.exports = {product, productDetail, users}


