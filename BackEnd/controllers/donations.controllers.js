const ModelDonations= require('../models').Donations;
const ModelHelper=require('../helpers/modelHelper');
const baseController = require("./base.controller");
const {Op}=require('sequelize');
const Stripe=require('stripe');

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

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
   
  // Stripe
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

   // Mercado Pago
   const paymentsMePa=async (req, res) => {
    try{
     
      

      //createDonation()

  } catch(error) {
      console.log(error)
      // res.status(500).json(error)
  }

  };

     
  //     async confirm(data,signature){
  //         let event;
  //         try {
  //             event=stripe.webhooks.constructEvent(data,signature,endpointSecret)
              
  //         } catch (err) {
  //             return{sucess:false,message:`Webhook Error : ${err.message}`}
  //         }
      
  
  //         switch (event.type) {
  //             case 'payment_intent.succeeded':
  //                 const paymentIntent = event.data.object;
  //                 console.log(paymentIntent)
  //                 // Then define and call a function to handle the event payment_intent.succeeded
  //             break;
  //             // ... handle other event types
  //             default:
  //                 console.log(`Unhandled event type ${event.type}`);
  //         }
  //         return {
  //             success:true,
  //             message:'OK'
  //         }
  //       }


// const paymentsServ=new PaymentsService()
// const clientSecret= paymentsServ.createIntent(total)
// return {
//   success:true,
//   clientSecret
// }



module.exports = {getAllDonations,
                  getAllDonationsByPayForm,
                  getAllDonationsByEmail,
                  getAllDonationsByCreate,
                  getDonationId,
                  createDonation,
                  paymentsStripe,
                  paymentsMePa,
                  deleteDonation};