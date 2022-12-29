const ModelDonations= require('../models').Donations;
const ModelHelper=require('../helpers/modelHelper');
const baseController = require("./base.controller");
const {Op}=require('sequelize');

const Stripe=require('stripe');
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const mercadopago = require('mercadopago');
mercadopago.configurations.setAccessToken(process.env.MERCADO_PAGO_ACCESS_TOKEN)


const getAllDonations= async (req, res) => {
  try{
     const paginated=new ModelHelper(ModelDonations)
     const {page}=req.query
     const pageLimit=100
     //const attributes=['name']

     const donationsPaginated= await paginated.findAndPaginate(page,pageLimit)
     
     res.status(200).json({previousPage:donationsPaginated.previousPage,
                           nextPage:donationsPaginated.nextPage,
                           donations:donationsPaginated.data})
   } catch(error) {
     res.status(500).json(error)
   }
};

const getDonationId= async (req, res) => {                          
  return baseController.getModelById(req, res, ModelDonations)
};

const getAllDonationsByPayForm= async (req, res) => {    
  const paramsName = req.params.payForm;
  try{
    const donations= await ModelDonations.findAll({where:{payForm:paramsName}})
    if(!donations){
      return res.status(404).json('pay form not found')
    } else{
      res.status(200).json(donations)
    }
  } catch(error) {
    res.status(500).json(error)
  }     
};

const getAllDonationsByEmail= async (req, res) => {    
  const paramsName = req.params.userEmail;
  try{
    const donations= await ModelDonations.findAll({where:{userEmail:paramsName}})
    if(!donations){
      return res.status(404).json('email not found')
    } else{
      res.status(200).json(donations)
    }
  } catch(error) {
    res.status(500).json(error)
  }     
};

const getAllDonationsByCreate= async (req, res) => {  
  const paramsDate = req.params.create.slice(0,10);
  const start=paramsDate+'T00:00:00.000Z';
	const end=paramsDate+'T24:00:00.000Z';
  try{
    const donations= await ModelDonations.findAll({where:{[Op.or]: [{ createdAt:{[Op.between]:[start, end]} }]}})
    console.log(donations)
    if(!donations){
      return res.status(404).json('date not found')
    } else{
      res.status(200).json(donations)
    }
  } catch(error) {
    res.status(500).json(error)
  }     
};

const createDonation= async (data)=> { 
  try{
    const donation=await ModelDonations.create(data)         
    console.log(donation)
  } catch (error) {        
    console.log(error);
  }
};

const deleteDonation=async (req,res)=>{
  try{
    const donation= await ModelDonations.findByPk(req.params.id) 
    
    if(!donation){
      return res.status(404).json('id not found')
    } else{
      const delDonation=await ModelDonations.destroy({where: {id: req.params.id}})
      return res.status(200).json({msg:`donation ${req.params.id} deleted`})
    }  
  } catch(error) {
    res.status(500).json(error)
  }
};
   
// Stripe - Hacer un pago con tarjeta de crédito
const paymentsStripe=async (req, res) => {
  const { id, data } = req.body;
  try{      
    //Create a PaymentIntent with the order amount and currency
    const payment = await stripe.paymentIntents.create({
      amount:req.body.data.amount,
      currency: "usd",
      description:"donation Stripe",
      payment_method:id,
      confirm:true
    });
    res.status(200).json({message: "Pago exitoso", 
                          clientSecret: payment });     
    //Guardar los datos en mi bd
    createDonation(data)
  } catch(error) {
      console.log(error.raw.message)
      res.status(500).json(error.raw.message)
  }
};

// Mercado Pago - Lista de metodos de pago
const listPaymentMethodsMercadoPago= async (req,res)=> {
  try {
    let response=await mercadopago.payment_methods.listAll();
    let payment_methods=response.body;
    res.status(200).json(payment_methods)
  } catch(error) {
    res.status(500).json(error)
  }
}


// Mercado Pago - Pagos con ticket ( pagofacil y rapipago )
const payWithTicketMercadoPago=async (req, res) => {
  try{      
    const data= await mercadopago.payment.create({
      transaction_amount: req.body.transaction_amount,
      description: 'donation mercadopago',
      payment_method_id:req.body.payment_method_id,
      payer: {
        email:req.body.payer.email
      }
    })
    res.status(200).json(data.body.transaction_details.external_resource_url)
    createDonation(req.body)
  } catch(error) {
    res.status(500).json(error)
  }
};

// Mercado Pago - Pagos con tarjeta ( credito y debito )
const payWithCardMercadoPago=async (req, res) => {
  try{     
     const datos=await mercadopago.payment.save(
      req.body.transaction_amount,
      req.body.cardholderName,
      req.body.cvc,
      req.body.cardNumber,
      req.body.cardExpirationMonth,
      req.body.cardExpirationYea,
      req.body.issuer,
      req.body.installments
      )
      console.log(datos)
    .then(function(response) {
       console.log('respuesta',response)
      const { status, status_detail, id } = response.body;
      res.status(response.status).json({ status, status_detail, id });
    })
  } catch(error) {
    res.status(500).json(error)
  };
};
  

module.exports = {getAllDonations,
                  getAllDonationsByPayForm,
                  getAllDonationsByEmail,
                  getAllDonationsByCreate,
                  getDonationId,
                  createDonation,
                  paymentsStripe,
                  payWithTicketMercadoPago,
                  payWithCardMercadoPago,
                  listPaymentMethodsMercadoPago,
                  deleteDonation};