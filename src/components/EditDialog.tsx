/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button, 
  TextField 
} from '@mui/material';

interface EditDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (row: any) => void;
  row: any | null;
}

const EditDialog: React.FC<EditDialogProps> = ({ open, onClose, onSave, row }) => {

  const [formData, setFormData] = useState<any>({
    id: '',
    analysisEngine: '',
    category: '',
    result: ''
  });

  useEffect(() => {
    if (row) {
      setFormData(row);
    } else {
      setFormData({
        id: '',
        analysisEngine: '',
        category: '',
        result: ''
      });
    }
  }, [row]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{row ? 'Modifier la ligne' : 'Ajouter une nouvelle ligne'}</DialogTitle>
      <DialogContent>
        <TextField
          name="id"
          label="ID"
          value={formData.id}
          onChange={handleChange}
          margin="dense"
          fullWidth
        />
        <TextField
          name="analysisEngine"
          label="Analysis Engine"
          value={formData.analysisEngine}
          onChange={handleChange}
          margin="dense"
          fullWidth
        />
        <TextField
          name="category"
          label="Category"
          value={formData.category}
          onChange={handleChange}
          margin="dense"
          fullWidth
        />
        <TextField
          name="result"
          label="Result"
          value={formData.result}
          onChange={handleChange}
          margin="dense"
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">Annuler</Button>
        <Button onClick={handleSave} color="primary">Sauvegarder</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditDialog;
