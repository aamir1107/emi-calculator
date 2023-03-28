import React, { useState, useRef, useEffect } from 'react'
import classes from './emiCalculator.module.scss'
import { Slider, Typography, Tooltip } from '@mui/material';
import { Table, TableCell, TableRow, TableHead } from '@material-ui/core';
import Chart from 'chart.js/auto';
import { v4 as uuidv4 } from 'uuid';



function EmiCalculator() {


  const [loanAmount, setloanAmount] = useState(50000);
  const [intrestRate, setIntrestRate] = useState(6)
  const [timePeriod, setTimePeriod] = useState(6)
  const [emi, setEmi] = useState()
  const [totalInterest, setTotalInterest] = useState(0)
  const [totalAmount, setTotalAmount] = useState(0)


  const canvasRef = useRef(null);
  const chartRef = useRef(null);
  const [chartData, setChartData] = useState();

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.destroy();
    }
    chartRef.current = new Chart(canvasRef.current, {
      type: 'pie',
      data: {
        labels: ['Principal', 'Interest'],
        datasets: [{
          data: [loanAmount, totalInterest],
          backgroundColor: ['#FF6384', '#36A2EB'],
          hoverBackgroundColor: ['#FF6384', '#36A2EB']
        }]
      }
    });
  }, [loanAmount, totalInterest]);

  const canvasId = uuidv4();



  const handleChange = (e) => {
    const updatedLoanAmount = e.target.value;
    setloanAmount(Number(updatedLoanAmount));
    calculateEMI(updatedLoanAmount, intrestRate, timePeriod)
  }


  const handleInterestChange = (e) => {
    const updatedIntrestRate = e.target.value;
    setIntrestRate(Number(updatedIntrestRate));
    calculateEMI(loanAmount, updatedIntrestRate, timePeriod)
  }

  const handleTimePeriodChange = (e) => {
    const updatedTimePeriod = e.target.value;
    setTimePeriod(Number(updatedTimePeriod))
    calculateEMI(loanAmount, intrestRate, updatedTimePeriod)
  }

  function calculateEMI(principalAmount, interestRateGiven, MonthTenure) {
    const monthlyInterestRateGiven = interestRateGiven / (12 * 100);
    const numberOfPayments = MonthTenure;
    const calculatedEmi = (principalAmount * monthlyInterestRateGiven * Math.pow(1 + monthlyInterestRateGiven, numberOfPayments))
      / (Math.pow(1 + monthlyInterestRateGiven, numberOfPayments) - 1);
    const myTotalInterest = calculatedEmi * numberOfPayments - principalAmount;
    const myTotalAmount = calculatedEmi * numberOfPayments;
    setEmi(calculatedEmi.toFixed(2));
    setTotalInterest(myTotalInterest.toFixed(2))
    setTotalAmount(myTotalAmount.toFixed(2))
  }


  return (
    <div className={classes.emiCalculator} >
      <div className={classes.emiCalculatorHeading}>
        <h3>Emi Calculator</h3>
      </div>

      <div className={classes.sLiderSection}>

        <div className={classes.loanAmountSection}>

          <Typography className={classes.loanHeading} >Loan Amount (<b>Rs</b>):</Typography>
          <Slider
            className={classes.slider}
            sx={{ color: 'success.main', }}
            valueLabelDisplay="auto"
            value={loanAmount}
            onChange={handleChange}

            aria-label="custom thumb label"
            min={50000}
            max={10000000}

          />
        </div>

        <div className={classes.intrestRateSlider}>
          <Typography className={classes.intrestHeading} >Intrest Rate(%):</Typography>
          <Slider
            className={classes.slider}
            sx={{ width: " 35rem", color: 'success.main', }}
            valueLabelDisplay="auto"
            value={intrestRate}
            onChange={handleInterestChange}
            aria-label="custom thumb label"
            min={6}
            max={50}
          />
        </div>

        <div className={classes.tenureSlider}>
          <Typography className={classes.tenureHeading}>Tenure (Monthly):</Typography>
          <Slider
            className={classes.slider}
            sx={{ width: " 35rem", color: 'success.main', }}
            valueLabelDisplay="auto"
            value={timePeriod}
            onChange={handleTimePeriodChange}
            aria-label="custom thumb label"
            min={6}
            max={120}
          />
        </div>


      </div>



      <div className={classes.tableSection}>
        <Table className={classes.table}>
          <TableHead >
            <TableRow>
              <TableCell className={classes.tableCellText}><b>Loan Amount:</b></TableCell>
              <TableCell className={classes.tableCellValue}><b>Rs {loanAmount}</b></TableCell>
            </TableRow>

            <TableRow>
              <TableCell className={classes.tableCellText}><b>Intrest Rate :</b></TableCell>
              <TableCell className={classes.tableCellValue}><b>{intrestRate}%</b></TableCell>
            </TableRow>

            <TableRow>
              <TableCell className={classes.tableCellText}><b>Teneure (Month) :</b></TableCell>
              <TableCell className={classes.tableCellValue}><b>{timePeriod}</b></TableCell>
            </TableRow>

            <TableRow>
              <TableCell className={classes.tableCellText}><b>Emi :</b></TableCell>
              <TableCell className={classes.tableCellValue} value={emi}><b>{emi}</b></TableCell>
            </TableRow>

            <TableRow>
              <TableCell className={classes.tableCellText}><b>Total Intrest :</b></TableCell>
              <TableCell className={classes.tableCellValue}><b>Rs {totalInterest}</b></TableCell>
            </TableRow>

            <TableRow>
              <TableCell className={classes.tableCellText}><b>Total Payment: <br></br>  Loan Amount + intrest :</b></TableCell>
              <TableCell className={classes.tableCellValue}><b>Rs {totalAmount} </b></TableCell>
            </TableRow>
          </TableHead>


        </Table>

      </div>

      <div className={classes.pieChart}>
        <canvas className={classes.pie} height={'300px'} width={'300px'} id={canvasId} ref={canvasRef} />
      </div>


    </div >
  )
}
export default EmiCalculator;