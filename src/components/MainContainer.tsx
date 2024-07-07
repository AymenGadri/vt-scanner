import React from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import logoSvg from '../assets/logo.svg';
import Styles from '../styles/MainContainerCss';

interface MainContainerProps {
  selectedType: string | null;
  inputValue: string;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onAnalyze: () => void;
  apiKey: string;
  onApiKeyChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onApiKeySubmit: () => void;
  file: File | null;
  onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  drawerOpen: boolean; 
}

const MainContainer: React.FC<MainContainerProps> = ({
  selectedType,
  inputValue,
  onInputChange,
  onAnalyze,
  apiKey,
  onApiKeyChange,
  onApiKeySubmit,
  onFileChange,
  drawerOpen,
}) => {
  const mainContainerStyle = {
    justifyContent: drawerOpen ? 'center' : 'center',
    width: drawerOpen ? `calc(100vw - 255px)` : 'calc(100vw - 80px)',
    display: 'flex',
    transition: 'width 0.3s ease',
  };

  if (!selectedType) {
    return (
      <Box sx={mainContainerStyle}>
      <div style={Styles.main}>
        <div style={Styles.header}>
          <Typography variant="h5" sx={{ fontFamily: 'IBM Plex Mono, monospace', marginTop: '90px' }}>
            IOC REPUTATION & ENRICHMENT
          </Typography>
        </div>

        <div style={Styles.middleBackground}></div>
        <div style={Styles.middleContainer}>
          <div style={Styles.IntroText}>
            <p style={Styles.paragraph}>
              Pour utiliser l'application, vous devez d'abord créer un compte gratuit sur &nbsp;
              <a
                href="https://www.virustotal.com/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#00BFFF' }}
              >
                VirusTotal
              </a>
              . Une fois le compte créé, copiez et collez la clé API dans le champ prévu à cet effet et appuyez sur
              "Démarrer". Vous trouverez la clé API sous /user/votre nom d utilisateur/apikey
            </p>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <TextField
              label={`Entrez la clé API ici`}
              value={apiKey}
              onChange={onApiKeyChange}
              type="password"
              sx={{
                backgroundColor: '#2C303A', 
                borderRadius: '8px', 
                input: { color: '#fff' }, 
                '& .MuiInputLabel-root': { color: '#ccc' },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#ccc', 
                  },
                  '&:hover fieldset': {
                    borderColor: '#fff',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#66bb6a', 
                  },
                },
                marginBottom: '16px',
                width: '400px',
              }}
            />
            <Button variant="contained" style={Styles.strtBtn} onClick={onApiKeySubmit}>
              Démarrer
            </Button>
          </div>
        </div>
        <div style={Styles.footer}>
          <div style={Styles.leftSide}>
            <p style={{ ...Styles.paragraphTwo, marginTop: 30 }}>Lorem ipsum </p>
            <p style={Styles.paragraphTwo}>Lorem ipsum </p>
            <p style={Styles.paragraphTwo}>Lorem ipsum </p>
            <p style={Styles.paragraphTwo}>Lorem ipsum </p>
          </div>
          <div style={Styles.rightSide}>
            <img src={logoSvg} alt="logo" style={Styles.logoSvg} />
            <a href="" style={Styles.link}>
              Privacy Policy - Terms of Service
            </a>
            <p style={Styles.paragraphThree}>Developed by Aymen</p>
          </div>
        </div>
      </div>
      </Box>
    );
  }

  return (
    <Box sx={mainContainerStyle}>
      {selectedType !== 'file' ? (
        <TextField
          label={`Enter ${selectedType}`}
          value={inputValue}
          onChange={onInputChange}
          fullWidth
          sx={{
            backgroundColor: '#2C303A', 
            borderRadius: '8px',
            input: { color: '#fff' }, 
            '& .MuiInputLabel-root': { color: '#ccc' }, 
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#ccc', 
              },
              '&:hover fieldset': {
                borderColor: '#fff', 
              },
              '&.Mui-focused fieldset': {
                borderColor: '#66bb6a', 
              },
            },
            marginBottom: '16px',
            width: '400px',
          }}
        />
      ) : (
        <input type="file" onChange={onFileChange} style={Styles.inputText} />
      )}
      <Button
        variant="contained"
        color="primary"
        onClick={onAnalyze}
        style={{ marginTop: '0px', height: '56px', marginLeft: '15px', marginBottom: '16px' }}
      >
        Analyser
      </Button>
    </Box>
  );
};

export default MainContainer;
