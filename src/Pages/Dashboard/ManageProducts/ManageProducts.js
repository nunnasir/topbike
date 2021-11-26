import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, CircularProgress } from '@mui/material';
import Swal from 'sweetalert2';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const ManageProducts = () => {
    const [products, setProducts] = React.useState([]);
    const [isLoadData, setIsLoadData] = React.useState(false);

    React.useEffect(() => {
        setIsLoadData(true);
        fetch('https://stark-beach-85559.herokuapp.com/products')
            .then(res => res.json())
            .then(data => {
                setProducts(data.products);
                setIsLoadData(false);
            })
    }, []);

    // Delete Order
    const onDeleteProduct = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://stark-beach-85559.herokuapp.com/products/${id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount > 0) {
                            Swal.fire(
                                'Deleted!',
                                'Your data has been deleted.',
                                'success'
                            )
                            const remainProducts = products.filter(product => product._id !== id);
                            setProducts(remainProducts);
                        }
                    })
                    .catch(error => {
                        Swal.fire(
                            'Failed!',
                            'Something Went wrong!',
                            'error'
                        );
                    })

            }
        })
    }

    return (
        !isLoadData ?
            <TableContainer component={Paper}>
                <Table aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>#</StyledTableCell>
                            <StyledTableCell>Product Name</StyledTableCell>
                            <StyledTableCell>Product Price</StyledTableCell>
                            <StyledTableCell>Action</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            products.map((product, index) => <StyledTableRow key={product._id}>
                                <StyledTableCell>{index + 1}</StyledTableCell>
                                <StyledTableCell>{product.name}</StyledTableCell>
                                <StyledTableCell>{product.price}</StyledTableCell>
                                <StyledTableCell>
                                    <Button onClick={() => onDeleteProduct(product._id)} variant="contained" color="warning" size="small">Delete</Button>
                                </StyledTableCell>
                            </StyledTableRow>)
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            :
            <>
                <CircularProgress />
            </>
    );
};

export default ManageProducts;