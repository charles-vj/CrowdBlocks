import React, { useState, useEffect } from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import CssBaseline from '@mui/material/CssBaseline'
import Grid from '@mui/material/Grid'
import StarIcon from '@mui/icons-material/StarBorder'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
import GlobalStyles from '@mui/material/GlobalStyles'
import Container from '@mui/material/Container'
import { ethers } from 'ethers'
import { crowdFundABI } from '../abis/CrowdFund'
import { useNavigate } from 'react-router-dom'
import { useAccount, useConnect, useEnsName } from 'wagmi'
import { useContract, useSigner } from 'wagmi'
import { Input } from '@mui/material'

function HomeC() {
  const navigate = useNavigate()
  const { address, isConnected } = useAccount()
  const [data, setData] = useState()
  const [loading, setLoading] = useState(true)
  const [aadhar, setAadhar] = useState('')
  const provider = new ethers.providers.JsonRpcProvider(
    'https://rpc.ankr.com/polygon_mumbai',
  )
  const { data: signer, isError, isLoading } = useSigner()
  console.log(signer)
  const contract = new ethers.Contract(
    '0xc19f5ea7faa1582b0b53f6c9bd7bc5af871eb801',
    crowdFundABI,
    signer,
  )
  const retriveCampaigners = async () => {
    console.log(contract)
    console.log(signer)
    const totalCampaigners = await contract.projectCount()
    console.log('helloo')
    var tiers = []
    for (var i = 0; i < totalCampaigners; i++) {
      const campaign = await contract.idToProject(i)
      const review = await contract.idToReviews(i)
      var owner = campaign.owner
      owner = owner.substring(0, 5) + '...'
      console.log(owner)
      console.log('FUNDS =', campaign.funds)
      var funds = ethers.BigNumber.from(campaign.funds).toString()
      funds = ethers.utils.formatUnits(funds, 18)
      var id = ethers.BigNumber.from(campaign.id).toNumber()
      var rating = ethers.BigNumber.from(review.average).toNumber()
      const object = {
        title: owner,
        funds: funds,
        id: id,
        rating: rating,
      }
      tiers.push(object)
    }
    // setProjects(tiers)
    setLoading(false)

    console.log(tiers)
  }
  useEffect(() => {
    if (!isConnected) {
      navigate('/')
    }
    // retriveCampaigners()
  }, [signer])

  const handleVaccinate = async () => {
    await contract.vaccinate('312', '1', aadhar, 'Covishield', 'Kottayam')
  }
  const handleRetrieve = async () => {
    const result = await contract.individuals('1234')
    setData(result)
  }
  const handleReview = async (id) => {
    await contract.addReview(id, 10)
  }

  return (
    <React.Fragment>
      <GlobalStyles
        styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }}
      />
      <CssBaseline />
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
      >
        <Toolbar sx={{ flexWrap: 'wrap' }}>
          <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
            CrowdBlocks
          </Typography>
          {/* <nav>
            <Link
              variant="button"
              color="text.primary"
              href="#"
              sx={{ my: 1, mx: 1.5 }}
            >
              Features
            </Link>
            <Link
              variant="button"
              color="text.primary"
              href="#"
              sx={{ my: 1, mx: 1.5 }}
            >
              Enterprise
            </Link>
            <Link
              variant="button"
              color="text.primary"
              href="#"
              sx={{ my: 1, mx: 1.5 }}
            >
              Support
            </Link>
          </nav>
          <Button href="#" variant="outlined" sx={{ my: 1, mx: 1.5 }}>
            Login
          </Button> */}
        </Toolbar>
      </AppBar>
      {/* Hero unit */}
      <Container
        disableGutters
        maxWidth="sm"
        component="main"
        sx={{ pt: 8, pb: 6 }}
      >
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
        >
          Records
        </Typography>
        <Typography
          variant="h6"
          align="center"
          color="text.secondary"
          component="p"
        >
          Check your medical records here
        </Typography>
      </Container>
      {/* End hero unit */}
      <Container maxWidth="md" component="main">
        Input your aadhar :{' '}
        <Input
          value={aadhar}
          onChange={(e) => setAadhar(e.target.value)}
        ></Input>
        <button onClick={handleRetrieve}> Submit</button>
      </Container>
      <Container>
        {data ? (
          <>
            Name = {data.nameOfLastVaccination} <br />
            Place = {data.placeOfLastVaccination}
            <br />
            Doses completed :{' '}
            {ethers.BigNumber.from(data.vaccinationReceived).toNumber()}
            <br />
            Last vaccination time :{' '}
            {ethers.BigNumber.from(data.timeOfLastVaccination).toNumber()}
          </>
        ) : (
          <></>
        )}
      </Container>
      {/* Footer */}
      <Container
        maxWidth="md"
        component="footer"
        sx={{
          borderTop: (theme) => `1px solid ${theme.palette.divider}`,
          mt: 8,
          py: [3, 6],
        }}
      >
        {/* <Grid container spacing={4} justifyContent="space-evenly">
          {footers.map((footer) => (
            <Grid item xs={6} sm={3} key={footer.title}>
              <Typography variant="h6" color="text.primary" gutterBottom>
                {footer.title}
              </Typography>
              <ul>
                {footer.description.map((item) => (
                  <li key={item}>
                    <Link href="#" variant="subtitle1" color="text.secondary">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </Grid>
          ))}
        </Grid> */}
      </Container>
      {/* End footer */}
    </React.Fragment>
  )
}

export default function Home() {
  return <HomeC />
}
