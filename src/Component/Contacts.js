import React, { useState, useEffect } from 'react';
import Firebase from './config/fire.js';

import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Button } from '@material-ui/core';
import Modal from './Modal.js';

export default function Contacts() {

    const [objCotact, setObjCotact] = useState({});
    const [currentId, setCurrentId] = useState('');

    useEffect(() => {
        Firebase.child('Contacts').on('value', snapshot => {
            if (snapshot.val() !== null) {
                setObjCotact({
                    ...snapshot.val(),
                })
            }
            else{
                setObjCotact({});
            }
        })
    }, [])

    const onDelete = (id) => {
        console.log("Delete Fun ", id);
        if (window.confirm("Are You Sure You Want To Delete This Record")) {
            Firebase.child(`Contacts/${id}`).remove(
                err => {
                    if (err) {
                        console.log("Error ", err);
                        alert("Error");
                    }
                    else {
                        setCurrentId('')
                    }
                }
            )
        }
    }

    const useStyles = makeStyles({
        table: {
            minWidth: 700,
        },
    });
    const StyledTableCell = withStyles((theme) => ({
        head: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
        body: {
            fontSize: 14,
        },
    }))(TableCell);

    const StyledTableRow = withStyles((theme) => ({
        root: {
            '&:nth-of-type(odd)': {
                backgroundColor: theme.palette.action.hover,
            },
        },
    }))(TableRow);

    const classes = useStyles();

    const [check, setCheck] = useState(false);
    const [edit, setEdit] = useState({id:"",data:""});

    const editFun = (obj, id) => {
        console.log("Edit Function Call ", obj, id);
        
       setEdit(pre=>{
            return{
                ...pre,
                id:id,
                data:obj
            }
        })
        setCheck(true);
     }

    return (
        <>
            <h1>List Of Contacts</h1>

            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="center">First Name</StyledTableCell>
                            <StyledTableCell align="center">Last Name</StyledTableCell>
                            <StyledTableCell align="center">Email Address</StyledTableCell>
                            <StyledTableCell align="center">Phone Number</StyledTableCell>
                            <StyledTableCell align="center">Action</StyledTableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Object.keys(objCotact).map(id => {
                            return (
                                <StyledTableRow key={id}>
                                    <StyledTableCell align="center">{objCotact[id].fName}</StyledTableCell>
                                    <StyledTableCell align="center">{objCotact[id].lName}</StyledTableCell>
                                    <StyledTableCell align="center">{objCotact[id].email}</StyledTableCell>
                                    <StyledTableCell align="center">{objCotact[id].phone}</StyledTableCell>
                                    <StyledTableCell align="center">
                                        <Button variant="contained" color="primary" onClick={()=>{editFun(objCotact[id], id)}}>Edit</Button>
                                        <Button variant="contained" color="secondary" onClick={()=>{onDelete(id)}}>Delete</Button>
                                    </StyledTableCell>
                                </StyledTableRow>
                            )
                        })
                        }
                    </TableBody>
                </Table>
            </TableContainer>

        {(check == true) && <Modal data={edit}/> }

        {/* {console.log("Contacts Console ", editId)} */}
        </>
    );
}
