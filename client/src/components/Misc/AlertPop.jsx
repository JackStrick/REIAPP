import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';



function AlertPop({ open, linkTo, buttonText, title, desc  }) {

    return (
        <Dialog open={open} PaperProps={{
            style: {
            width: '40%', // Adjust the width as needed was 2000px
            margin: '16px',    // Adjust the margin as needed
            },
        }}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <Typography variant="h6">{desc}</Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={function () {window.location.href = linkTo}} color="primary">
                    {buttonText}
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default AlertPop;