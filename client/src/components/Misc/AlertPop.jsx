import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';



function AlertPop({ open }) {

    return (
        <Dialog open={open} PaperProps={{
            style: {
            width: '40%', // Adjust the width as needed was 2000px
            margin: '16px',    // Adjust the margin as needed
            },
        }}>
            <DialogTitle>No Properties Added</DialogTitle>
            <DialogContent>
                <Typography variant="h6">Add properties to your favorites list to find deals</Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={function () {window.location.href = `/leadfind`}} color="primary">
                    Find Leads
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default AlertPop;