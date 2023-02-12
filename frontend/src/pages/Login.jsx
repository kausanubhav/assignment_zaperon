import * as React from "react"
import { useContext, useState, useEffect } from "react"
import Avatar from "@mui/material/Avatar"
import Button from "@mui/material/Button"
import CssBaseline from "@mui/material/CssBaseline"
import TextField from "@mui/material/TextField"
import Box from "@mui/material/Box"
import { PersonOutlined } from "@mui/icons-material"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import { Link } from "react-router-dom"
import { AuthContext } from "../context/authContext/AuthContext"
import { login } from "../context/authContext/apiCalls"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

const theme = createTheme()

export default function Login() {
  const [formData, setFormData] = useState({
    name: "",
    password: "",
  })
  const { name, password } = formData
  const { message, error, dispatch } = useContext(AuthContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (error) {
      toast.error(error)
    }
  }, [error, message])

  const onChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    login({ name, password }, dispatch)
    navigate("/")
  }
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ width: "6rem", height: "6rem", m: 1, bgcolor: "rgb(239,239,239)" }}>
            <PersonOutlined sx={{ color: "rgb(5,67,186)", fontSize: "4rem" }} />
          </Avatar>
          <Typography component="h1" variant="h2" sx={{ color: "rgb(44,80,111)", fontWeight: 800 }}>
            Welcome!
          </Typography>
          <Typography
            variant={{ sm: "h6", md: "h5", lg: "h5" }}
            sx={{ color: "rgb(221,227,232)", marginTop: 2 }}
          >
            Let's connect to your workspace!
          </Typography>
          <Typography
            variant={{ sm: "h6", md: "h5", lg: "h5" }}
            sx={{ color: "rgb(221,227,232)", marginTop: 0 }}
          >
            Please enter your credentials to continue
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Username"
              name="name"
              value={name}
              autoComplete="name"
              autoFocus
              onChange={onChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              value={password}
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={onChange}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, backgroundColor: "rgb(0,63,185)", fontWeight: 600 }}
            >
              Sign In
            </Button>
          </Box>
          <Typography
            variant={{ sm: "h6", md: "h5", lg: "h5" }}
            sx={{ color: "rgb(221,227,232)", marginTop: 0 }}
          >
            Don't have an account?{" "}
            <Link to="/register" style={{ textDecoration: "none", color: "rgb(0,63,185)" }}>
              Sign Up
            </Link>
          </Typography>
        </Box>
      </Container>
    </ThemeProvider>
  )
}
