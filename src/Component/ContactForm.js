import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import Firebase from './config/fire.js';



export default function ContactForm(props) {
    const [fullName, setFullName] = useState({
        fName: '',
        lName: '',
        email: '',
        phone: ''
    });

    const inputEvent = (event) => {
        console.log("event.target.value ", event.target.value);
        const { name, value } = event.target;

        setFullName((preValue) => {
            return {
                ...preValue,
                [name]: value
            }
        })
    }
    const onSubmits = (e) => {
        e.preventDefault();
        Firebase.child('Contacts').push(fullName,
            err => {
                if (err) {
                    console.log("Error ", err);
                    alert("error");
                }
            })
    }

    const useStyles = makeStyles((theme) => ({
        root: {
            '& > *': {
                margin: theme.spacing(1),
                // width: '50%',
                textAlign: "center",
            },
        },

        table: {
            width: '90%',
        },
    }));

    const classes = useStyles();


    return (
        <>
            <div>
                <form className={classes.root} noValidate autoComplete="off" onSubmit={onSubmits}>
                    <TextField id="standard-basic" label="First Name" type="text" name="fName" onChange={inputEvent} />
                    <TextField id="standard-basic" label="Last Name" type="text" name="lName" onChange={inputEvent} />
                    <TextField id="standard-basic" label="Email" type="email" name="email" onChange={inputEvent} />
                    <TextField id="standard-basic" label="Phone No" type="phone" name="phone" onChange={inputEvent} />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        className={classes.button} >
                        Save</Button>
                </form>

            </div>
        </>
    );
}
