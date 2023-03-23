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
} from '@mui/material';

import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import useTaxCalculator from 'hooks/useTaxCalculator';
import { useNumberFormat } from 'hooks/useNumberFormat';

import PrimjerUplatnice from '../assets/PrimjerUplatnice.png';
import AMS1035 from '../assets/AMS-1035.png';
import { CheckBox, CheckBoxOutlineBlank } from '@mui/icons-material';

const useStyles = makeStyles((theme) => ({
  main: {
    flexGrow: 1,
    minHeight: '100vh',
    backgroundColor: theme.palette.background.default,
  },
  content: {
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    marginTop: theme.spacing(4),
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
    marginTop: theme.spacing(4),
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
  },
  summary: {
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
      transform: 'none',
    },
  },
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
  const [expanded, setExpanded] = useState([false, false, false, false]);
  const { brutoValue, onBrutoChange, calculateTaxes, taxCalculations } =
    useTaxCalculator();

  const { formatNumberOutput } = useNumberFormat();

  const handleChange = (stepIndex) => {
    expanded[stepIndex] = !expanded[stepIndex];
    setExpanded([...expanded]);
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
          sx={{ width: '60%', margin: ' 0 0 20px 0' }}
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
            endAdornment={<InputAdornment position="end">KM</InputAdornment>}
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
        <Accordion expanded={!expanded[0]} onChange={() => handleChange(0)}>
          <AccordionSummary
            className={classes.summary}
            expandIcon={
              <Button variant="outlined" size='small' color={expanded[0] ? 'success' :'neutral'} endIcon={expanded[0] ? <CheckBox color='success' /> : <CheckBoxOutlineBlank />}>
                Done
              </Button>
            }
            aria-controls="panel4bh-content"
            id="panel4bh-header"
          >
            <Typography className={classes.heading}>
              {phrases.cantonalZZO}
            </Typography>
          </AccordionSummary>
          <AccordionDetails
            sx={{
              justifyContent: 'center',
              alignItems: 'center',
              display: 'flex',
            }}
          >
            <img
              style={{ borderRadius: '0.3em', width: '70%' }}
              src={PrimjerUplatnice}
              alt="uplatnica-1"
            />
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={!expanded[1]} onChange={() => handleChange(1)}>
          <AccordionSummary
            className={classes.summary}
            expandIcon={
                <Button variant="outlined" size='small' color={expanded[1] ? 'success' :'neutral'} endIcon={expanded[1] ? <CheckBox color='success' /> : <CheckBoxOutlineBlank />}>
                  Done
                </Button>
              }
            aria-controls="panel4bh-content"
            id="panel4bh-header"
          >
            <Typography className={classes.heading}>
              {phrases.federalZZO}
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{
              justifyContent: 'center',
              alignItems: 'center',
              display: 'flex',
            }}>
              <img
                style={{ borderRadius: '0.3em', width: '70%' }}
                src={PrimjerUplatnice}
                alt="uplatnica-1"
              />
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={!expanded[2]} onChange={() => handleChange(2)}>
          <AccordionSummary
            className={classes.summary}
            expandIcon={
                <Button variant="outlined" size='small' color={expanded[2] ? 'success' :'neutral'} endIcon={expanded[2] ? <CheckBox color='success' /> : <CheckBoxOutlineBlank />}>
                  Done
                </Button>
              }
            aria-controls="panel4bh-content"
            id="panel4bh-header"
          >
            <Typography className={classes.heading}>
              {phrases.incomeTax}
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{
              justifyContent: 'center',
              alignItems: 'center',
              display: 'flex',
            }}>
              <img
                style={{ borderRadius: '0.3em', width: '70%' }}
                src={PrimjerUplatnice}
                alt="uplatnica-1"
              />
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={!expanded[3]} onChange={() => handleChange(3)}>
          <AccordionSummary
            className={classes.summary}
            expandIcon={
                <Button variant="outlined" size='small' color={expanded[3] ? 'success' :'neutral'} endIcon={expanded[3] ? <CheckBox color='success' /> : <CheckBoxOutlineBlank />}>
                  Done
                </Button>
              }
            aria-controls="panel5bh-content"
            id="panel5bh-header"
          >
            <Typography className={classes.heading}>AMS-1035</Typography>
          </AccordionSummary>
          <AccordionDetails sx={{
              justifyContent: 'center',
              alignItems: 'center',
              display: 'flex',
            }}>
              <img
                style={{ borderRadius: '0.3em', width: '70%' }}
                src={AMS1035}
                alt="uplatnica-1"
              />
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
                ? formatNumberOutput(taxCalculations.total.toFixed(2))
                : 0.0}{' '}
              KM
            </Typography>
          </AccordionSummary>
        </Accordion>
      </div>
    </>
  );
};

export default Calculator;
