const { response } = require('express');

const Account = require('../models/account');


const getAccounts = async(req, res) => {

    const accounts = await Account.find({}, 'accountName client accountManager consult');

    res.json({
        ok: true,
        accounts,
        id: req.id
    });
}

const createAccount = async( req, res = response ) => {

    const { accountName, client, accountManager, consult } = req.body;

    try {
        // Request the Body
        const account = new Account( req.body );

        // Save Account
        await account.save();

        res.json({
            ok: true,
            account
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error Creating new Account'
        });
    }
}

const updateAccount = async( req, res = response ) => {

    const id = req.params.id;

    try {

        const dbAccount = await Account.findById( id );

        if( !dbAccount ) {
            return res.status(400).json({
                ok: false,
                msg: 'Not account found'
            });
        }

        const updatedAccount = await Account.findByIdAndUpdate( id, req.body, { new: true } );

        res.json({
            ok: true,
            user: updatedAccount
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error Updating Account'
        });
    }
};

const deleteAccount = async(req, res = response ) => {

    const id = req.params.id;

    try {
        const dbAccount = await Account.findById( id );

        if( !dbAccount ) {
            return res.status(400).json({
                ok: false,
                msg: 'Not Account found'
            });
        }

        await Account.findByIdAndDelete( id );

        res.json({
            ok: true,
            msg: 'Account has been Deleted'
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error Deleting Account'
        });
    }
}


module.exports = {
    getAccounts,
    createAccount,
    updateAccount,
    deleteAccount
};
