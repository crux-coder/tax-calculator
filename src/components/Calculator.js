import React, { useState } from 'react';

import { makeStyles, withStyles } from '@mui/styles';
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
    FormControl,
    InputLabel,
    OutlinedInput,
    InputAdornment,
    Button,
    Tooltip,
    Box,
} from '@mui/material';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import useTaxCalculator from 'hooks/useTaxCalculator';
import { useNumberFormat } from "hooks/useNumberFormat";
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    main: {
        flexGrow: 1,
        minHeight: '100vh',
        backgroundColor: theme.palette.background.default
    },
    content: {
        marginLeft: theme.spacing(3),
        marginRight: theme.spacing(3),
        marginTop: theme.spacing(4)
    },
    brutoFormControl: {
        width: '33%',
    },
    brutoForm: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    calculateBtn: {
        marginTop: theme.spacing(2),
    },
    root: {
        width: '50%',
        textAlign: 'left',
        margin: 'auto',
        marginTop: theme.spacing(4)
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '66.6%',
        flexShrink: 0,
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
    },
    nonClickable: {
        cursor: 'default',
    }
}));


const HtmlTooltip = withStyles((theme) => ({
    tooltip: {
        backgroundColor: '#f5f5f9',
        color: 'rgba(0, 0, 0, 0.87)',
        maxWidth: 220,
        fontSize: theme.typography.pxToRem(12),
        border: '1px solid #dadde9',
    },
}))(Tooltip);

/**
 * Main container for all of the components.
 */
const Calculator = ({ phrases }) => {
    const classes = useStyles();
    const [expanded, setExpanded] = useState(false);
    const {
        brutoValue,
        onBrutoChange,
        calculateTaxes,
        taxCalculations } = useTaxCalculator();

    const { formatNumberOutput } = useNumberFormat();


    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const handleFocus = (event) => event.target.select();

    const onFormSubmit = (e) => {
        e.preventDefault();
        calculateTaxes();
    }

    const onCalculateButtonClick = ()=>{
        calculateTaxes();
    }

    return (
        <>
            <form className={classes.brutoForm} onSubmit={onFormSubmit}>
                <FormControl fullWidth sx={{ m: 5, width: '60%' }} >
                    <InputLabel htmlFor="outlined-adornment-amount">{phrases.gross}</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-amount"
                        value={brutoValue}
                        onChange={onBrutoChange}
                        onFocus={handleFocus}
                        endAdornment={<InputAdornment position="end">KM</InputAdornment>}
                        label={phrases.gross}
                    />
                </FormControl>
                <Button onClick={onCalculateButtonClick} className={classes.calculateBtn} size="large" variant="contained" color="primary">{phrases.calculate}!</Button>
            </form>
            <div className={classes.root}>
                <Accordion expanded={false} onChange={() => false}>
                    <AccordionSummary
                        className={classes.nonClickable}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                        expandIcon={
                            <HtmlTooltip
                                title={
                                    <React.Fragment>
                                        <Typography color="inherit">{phrases.grossAmount}</Typography>
                                        <p>{phrases.grossAmountDescription}</p>
                                    </React.Fragment>
                                }
                            >
                                <HelpOutlineIcon />
                            </HtmlTooltip>}
                    >
                        <Typography className={classes.heading}>{phrases.grossAmount}:</Typography>
                        <Typography className={classes.secondaryHeading}>{taxCalculations.bruto ? formatNumberOutput(taxCalculations.bruto) : 0} KM</Typography>
                    </AccordionSummary>
                </Accordion>
                <Accordion expanded={expanded === 'zzotk'} onChange={handleChange('zzotk')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel4bh-content"
                        id="panel4bh-header"
                    >
                        <Typography className={classes.heading}>{phrases.cantonalZZO}:</Typography>
                        <Typography className={classes.secondaryHeading}>
                            {taxCalculations.cantonalZZO ? formatNumberOutput((taxCalculations.cantonalZZO).toFixed(2)) : 0.00} KM
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>

                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'fond'} onChange={handleChange('fond')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel4bh-content"
                        id="panel4bh-header"
                    >
                        <Typography className={classes.heading}>{phrases.federalZZO}:</Typography>
                        <Typography className={classes.secondaryHeading}>
                            {taxCalculations.federalZZO ? formatNumberOutput((taxCalculations.federalZZO).toFixed(2)) : 0.00} KM
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>

                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'budget'} onChange={handleChange('budget')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel4bh-content"
                        id="panel4bh-header"
                    >
                        <Typography className={classes.heading}>{phrases.incomeTax}:</Typography>
                        <Typography className={classes.secondaryHeading}>
                            {taxCalculations.incomeTax ? formatNumberOutput((taxCalculations.incomeTax).toFixed(2)) : 0.00} KM
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>

                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={false} onChange={() => false}>
                    <AccordionSummary
                        className={classes.nonClickable}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                        expandIcon={
                            <HtmlTooltip
                                title={
                                    <React.Fragment>
                                        <Typography color="inherit">{phrases.totalAmount}</Typography>
                                        <p>{phrases.totalAmountDescription}</p>
                                    </React.Fragment>
                                }
                            >
                                <HelpOutlineIcon />
                            </HtmlTooltip>}
                    >
                        <Typography className={classes.heading}>{phrases.total}:</Typography>
                        <Typography className={classes.secondaryHeading}>{taxCalculations.total ? formatNumberOutput((taxCalculations.total).toFixed(2)) : 0.00} KM</Typography>
                    </AccordionSummary>
                </Accordion>
                {taxCalculations.bruto > 0  ? <Box textAlign='center'>
                    <Button variant="outlined" component={Link} to={'/depositslip'} sx={{ m: '5px' }}>UPLATNICA</Button>
                </Box> : <Box></Box>}
            </div>
        </>
    );
};

export default Calculator;