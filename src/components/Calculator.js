import React, { useState } from "react";

import { makeStyles, withStyles } from "@mui/styles";
import { styled } from '@mui/material/styles';
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
    Stack,
    Paper
} from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import useTaxCalculator from "hooks/useTaxCalculator";
import { useNumberFormat } from "hooks/useNumberFormat";

import PrimjerUplatnice from '../assets/PrimjerUplatnice.png';
import AMS1035 from '../assets/AMS-1035.png';

const useStyles = makeStyles((theme) => ({
    main: {
        flexGrow: 1,
        minHeight: "100vh",
        backgroundColor: theme.palette.background.default,
    },
    content: {
        marginLeft: theme.spacing(3),
        marginRight: theme.spacing(3),
        marginTop: theme.spacing(4),
    },
    brutoFormControl: {
        width: "33%",
    },
    brutoForm: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    },
    calculateBtn: {
        marginTop: theme.spacing(2),
    },
    root: {
        width: "50%",
        textAlign: "left",
        margin: "auto",
        marginTop: theme.spacing(4),
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: "66.6%",
        flexShrink: 0,
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
    },
    nonClickable: {
        cursor: "default",
    },
}));

const HtmlTooltip = withStyles((theme) => ({
    tooltip: {
        backgroundColor: "#f5f5f9",
        color: "rgba(0, 0, 0, 0.87)",
        maxWidth: 220,
        fontSize: theme.typography.pxToRem(12),
        border: "1px solid #dadde9",
    },
}))(Tooltip);


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body1,
    padding: theme.spacing(1.5),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
}));

/**
 * Main container for all of the components.
 */
const Calculator = ({ phrases }) => {
    const classes = useStyles();
    const [expanded, setExpanded] = useState(false);
    const { brutoValue, onBrutoChange, calculateTaxes, taxCalculations } =
        useTaxCalculator();

    const { formatNumberOutput } = useNumberFormat();

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const handleFocus = (event) => event.target.select();

    const onFormSubmit = (e) => {
        e.preventDefault();
        calculateTaxes();
    };

    return (
        <>
            <form className={classes.brutoForm} onSubmit={onFormSubmit}>
                <FormControl
                    sx={{ width: "60%", margin: " 0 0 20px 0" }}
                    fullWidth
                    className={classes.brutoFormControl}
                    variant="outlined"
                >
                    <InputLabel htmlFor="outlined-adornment-amount">
                        {phrases.gross}
                    </InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-amount"
                        value={brutoValue}
                        onChange={onBrutoChange}
                        onFocus={handleFocus}
                        endAdornment={
                            <InputAdornment position="end">KM</InputAdornment>
                        }
                    />
                </FormControl>
                <Button
                    onClick={calculateTaxes}
                    className={classes.calculateBtn}
                    size="large"
                    variant="contained"
                    color="primary"
                >
                    {phrases.calculate}!
                </Button>
            </form>
            <div className={classes.root}>
                <Accordion expanded={false}>
                    <AccordionSummary
                        className={classes.nonClickable}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                        expandIcon={
                            <HtmlTooltip
                                title={
                                    <React.Fragment>
                                        <Typography color="inherit">
                                            {phrases.grossAmount}
                                        </Typography>
                                        <p>{phrases.grossAmountDescription}</p>
                                    </React.Fragment>
                                }
                            >
                                <HelpOutlineIcon />
                            </HtmlTooltip>
                        }
                    >
                        <Typography className={classes.heading}>
                            {phrases.grossAmount}:
                        </Typography>
                        <Typography className={classes.secondaryHeading}>
                            {taxCalculations.bruto
                                ? formatNumberOutput(taxCalculations.bruto)
                                : 0}{" "}
                            KM
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails></AccordionDetails>
                </Accordion>
                <Accordion
                    expanded={expanded === "zzotk"}
                    onChange={handleChange("zzotk")}
                >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel4bh-content"
                        id="panel4bh-header"
                    >
                        <Typography className={classes.heading}>
                            {phrases.cantonalZZO}:
                        </Typography>
                        <Typography className={classes.secondaryHeading}>
                            {taxCalculations.cantonalZZO
                                ? formatNumberOutput(
                                    taxCalculations.cantonalZZO.toFixed(2)
                                )
                                : 0.0}{" "}
                            KM
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Paper sx={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            display: 'flex',
                            borderTopLeftRadius: 0,
                            borderTopRightRadius: 0
                        }}>
                            <img style={{ borderRadius: '0.5em', width: '70%' }} src={PrimjerUplatnice} alt="uplatnica-1"></img>
                        </Paper>
                    </AccordionDetails>
                </Accordion>
                <Accordion
                    expanded={expanded === "fond"}
                    onChange={handleChange("fond")}
                >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel4bh-content"
                        id="panel4bh-header"
                    >
                        <Typography className={classes.heading}>
                            {phrases.federalZZO}:
                        </Typography>
                        <Typography className={classes.secondaryHeading}>
                            {taxCalculations.federalZZO
                                ? formatNumberOutput(
                                    taxCalculations.federalZZO.toFixed(2)
                                )
                                : 0.0}{" "}
                            KM
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Paper sx={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            display: 'flex',
                            borderTopLeftRadius: 0,
                            borderTopRightRadius: 0
                        }}>
                            <img style={{ borderRadius: '0.5em', width: '70%' }} src={PrimjerUplatnice} alt="uplatnica-1"></img>
                        </Paper>
                    </AccordionDetails>
                </Accordion>
                <Accordion
                    expanded={expanded === "budget"}
                    onChange={handleChange("budget")}
                >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel4bh-content"
                        id="panel4bh-header"
                    >
                        <Typography className={classes.heading}>
                            {phrases.incomeTax}:
                        </Typography>
                        <Typography className={classes.secondaryHeading}>
                            {taxCalculations.incomeTax
                                ? formatNumberOutput(
                                    taxCalculations.incomeTax.toFixed(2)
                                )
                                : 0.0}{" "}
                            KM
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Paper sx={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            display: 'flex',
                            borderTopLeftRadius: 0,
                            borderTopRightRadius: 0
                        }}>
                            <img style={{ borderRadius: '0.5em', width: '70%' }} src={PrimjerUplatnice} alt="uplatnica-1"></img>
                        </Paper>
                    </AccordionDetails>
                </Accordion>
                <Accordion
                    expanded={expanded === "ams"}
                    onChange={handleChange("ams")}
                >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel5bh-content"
                        id="panel5bh-header"
                    >
                        <Typography className={classes.heading}>
                            AMS-1035
                        </Typography>
                        <Typography className={classes.secondaryHeading}>
                            {taxCalculations.incomeTax
                                ? formatNumberOutput(
                                    taxCalculations.incomeTax.toFixed(2)
                                )
                                : 0.0}{" "}
                            KM
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Paper sx={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            display: 'flex',
                            borderTopLeftRadius: 0,
                            borderTopRightRadius: 0
                        }}>
                            <img style={{ borderRadius: '0.5em', width: '70%' }} src={PrimjerUplatnice} alt="uplatnica-1"></img>
                        </Paper>
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
                                        <Typography color="inherit">
                                            {phrases.totalAmount}
                                        </Typography>
                                        <p>{phrases.totalAmountDescription}</p>
                                    </React.Fragment>
                                }
                            >
                                <HelpOutlineIcon />
                            </HtmlTooltip>
                        }
                    >
                        <Typography className={classes.heading}>
                            {phrases.total}:
                        </Typography>
                        <Typography className={classes.secondaryHeading}>
                            {taxCalculations.total
                                ? formatNumberOutput(
                                    taxCalculations.total.toFixed(2)
                                )
                                : 0.0}{" "}
                            KM
                        </Typography>
                    </AccordionSummary>
                </Accordion>
            </div>
        </>
    );
};

export default Calculator;
