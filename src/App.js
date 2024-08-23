import React, { useState, useRef } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import moment from 'moment';


export default function App() {
  const [rows, setRows] = useState([])
  let index = useRef(1);
  const [step, setStep] = useState();
  const [date, setDate] = useState();
  const total = rows.reduce((partialSum, a) => partialSum + parseInt(a.stepCount), 0)

  const handleAddSteps = () => {
    const alreadyExists = rows.find((row) => {
      return row.date.toDateString() == date.$d.toDateString()
    })
    if (alreadyExists) {
      alreadyExists.stepCount = parseInt(alreadyExists.stepCount) + parseInt(step);
      setRows([...rows].sort((r1, r2) => r2.date - r1.date))
    } else {
      setRows([...rows, { index: index.current++, date: date.$d, stepCount: step }].sort((r1, r2) => r2.date - r1.date))
    }
    setDate(null);
    setStep('');
  }
  const handleStepInput = (e) => {
    setStep(e.target.value)
  }
  const handleDateChange = (e) => {
    setDate(e)
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ bgcolor: '#F9F9F9', width: '800px', p: 3 }} >
        <Typography variant="h2" component="h2" sx={{ mb: 2, 'font-family': 'Lora' }}>
          Steptober Challenge
        </Typography>

        <Typography variant="h4" component="h4" sx={{ mb: 2, 'font-family': 'Lora' }}>
          Sara
        </Typography>

        <Typography variant="h6" component="h6" sx={{ mb: 2, 'font-family': 'Lora', pt: 5 }}>
          My steps
        </Typography>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker slotProps={{
            actionBar: {
              actions: ['clear'],
            },
          }} value={date} format="DD/MM/YYYY" label="dd/mm/yyyy" onChange={handleDateChange} />
        </LocalizationProvider>
        <TextField type="number" value={step} id="outlined-basic" label="steps" variant="outlined" sx={{ ml: 20 }}
          onChange={handleStepInput} />
        <Button disabled={!step || !date} size="large" variant="contained" sx={{ ml: 3, height: '55px', backgroundColor: '#FAB816' }}
          onClick={handleAddSteps}>Add steps</Button>

        <Table sx={{ mt: 2, maxWidth: 740 }}>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.index} sx={{ borderTop: '1px dashed', borderColor: '#D5D5D6' }}>
                <TableCell align="left">{row.index}</TableCell>
                <TableCell align="left">{moment(row.date).format('DD MMM YYYY')}</TableCell>
                <TableCell align="right">{row.stepCount}</TableCell>
              </TableRow>
            ))}
            {rows.length > 0 &&
              <TableRow sx={{ borderTop: '4px solid', borderColor: '#D5D5D6', borderBottom: 0 }}>
                <TableCell colSpan={2} align="left">TOTAL</TableCell>
                <TableCell align="right">{total}</TableCell>
              </TableRow>
            }
          </TableBody>
        </Table>
      </Box>
    </Container>
  );
}
