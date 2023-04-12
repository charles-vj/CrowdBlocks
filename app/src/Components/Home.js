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

function HomeC() {
  const navigate = useNavigate()
  const { address, isConnected } = useAccount()
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const provider = new ethers.providers.JsonRpcProvider(
    'https://rpc.ankr.com/polygon_mumbai',
  )
  const { data: signer, isError, isLoading } = useSigner()
  console.log(signer)
  const contract = new ethers.Contract(
    '0x30A8dF7C6D99b6380c37b01b48a62c8D866a48cF',
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
    setProjects(tiers)
    setLoading(false)

    console.log(tiers)
  }
  useEffect(() => {
    if (!isConnected) {
      navigate('/')
    }
    retriveCampaigners()
  }, [signer])

  const handleDonate = async (id) => {
    await contract.lockFunds(id, '100000000000000000', {
      value: '100000000000000000',
    })
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
          Projects
        </Typography>
        <Typography
          variant="h6"
          align="center"
          color="text.secondary"
          component="p"
        >
          The internet has unlocked unprecedented opportunities for
          collaboration and creation. Now web3 technology like open source
          protocols and decentralized blockchains give us the ability to take
          that co-creation to a new scale. The CrowdBlocks community uses this
          technology to fund and build digital public goods projects that serve
          everyone, and solve our most immediate problems.
        </Typography>
      </Container>
      {/* End hero unit */}
      <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="flex-end">
          {!loading ? (
            projects.map((tier) => (
              // Enterprise card is full width at sm breakpoint
              <Grid
                item
                key={tier.title}
                xs={12}
                sm={tier.title === 'Enterprise' ? 12 : 6}
                md={4}
              >
                <Card>
                  <CardHeader
                    title={'Owner : ' + tier.title}
                    subheader={'ID : ' + tier.id}
                    titleTypographyProps={{ align: 'center' }}
                    action={tier.title === 'Pro' ? <StarIcon /> : null}
                    subheaderTypographyProps={{
                      align: 'center',
                    }}
                    sx={{
                      backgroundColor: (theme) =>
                        theme.palette.mode === 'light'
                          ? theme.palette.grey[200]
                          : theme.palette.grey[700],
                    }}
                  />
                  <CardContent>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'baseline',
                        mb: 2,
                      }}
                    >
                      <Typography
                        component="h2"
                        variant="h3"
                        color="text.primary"
                      >
                        {tier.funds}
                      </Typography>
                      <Typography variant="h6" color="text.secondary">
                        matic
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'baseline',
                        mb: 2,
                      }}
                    >
                      <Typography
                        component="h2"
                        variant="h3"
                        color="text.primary"
                      >
                        Rating : {tier.rating}
                      </Typography>
                      <Typography
                        variant="h6"
                        color="text.secondary"
                      ></Typography>
                    </Box>
                    {/* <ul>
                      {tier.description.map((line) => (
                        <Typography
                          component="li"
                          variant="subtitle1"
                          align="center"
                          key={line}
                        >
                          {line}
                        </Typography>
                      ))}
                    </ul> */}
                  </CardContent>
                  <CardActions>
                    <Button
                      fullWidth
                      variant={tier.buttonVariant}
                      onClick={() => {
                        handleDonate(tier.id)
                      }}
                    >
                      Donate
                    </Button>
                  </CardActions>
                  <CardActions>
                    <Button
                      fullWidth
                      variant={tier.buttonVariant}
                      onClick={() => {
                        handleReview(tier.id)
                      }}
                    >
                      Review
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))
          ) : (
            <></>
          )}
        </Grid>
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
