const { Router } = require('express');

const CustomerController = require('../controllers/customerController.js');
const { validateCustomer } = require('../middleware/validate.mw.js');
const router = new Router();

router
    .route('/')
    .get(CustomerController.getAllCustomers)
    .post(validateCustomer, CustomerController.createCustomer)
    .put(validateCustomer, CustomerController.updateCustomer);
router
    .route('/:customerId')
    .get(CustomerController.getCustomerById)
    .delete(CustomerController.deleteCustomer);

module.exports = router;