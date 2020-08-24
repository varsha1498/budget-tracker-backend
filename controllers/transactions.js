const Transaction  = require('../models/Transaction');

//GEt all transactions
//Route -  /api/v1/transactions


exports.getTransactions = async (req, res, next) => {
    try{
        console.log("I am in server");
        const {email} = req.query;
        const transactions = await Transaction.find({"email": email});
        return res.status(200).json({
            message: "Successful",
            data: transactions
        })
    }
    catch(err){
        return res.status(500).json({
            error: "error occured"
        })
    }
}

//Add transactions
//Route -  /api/v1/transactions


exports.addTransactions = async (req, res, next) => {
  try{
    const { text, amount, email } = req.body;
    
    const transaction = await Transaction.create(req.body);

    return res.status(200).json({
        sucess: true,
        data: transaction
    })
  }
  catch(err){
      return res.status(500).json({
          error: "Failed"
      })
  }
}


//Delete a transaction
//Route -  /api/v1/transactions


exports.deleteTransactions = async (req, res, next) => {
    try{
        const transaction = await Transaction.findById(req.params.id);

        if(!transaction){
            return res.status(404).json({
                sucess: false,
                error: "No transaction found"
            });
        }

        await transaction.remove();
        return res.status(200).json({
            success: true,
            data: []
        });
    }
    catch(err){
        return res.status(500).json({
            error: "something went wrong"
        });
    }
}