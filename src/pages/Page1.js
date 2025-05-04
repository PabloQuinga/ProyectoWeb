import React, { useState } from 'react';
import { Button, Input, List, Card, Typography, Space } from 'antd';
import { PlusOutlined, DeleteOutlined, CheckOutlined } from '@ant-design/icons';

import ExpensiveComponent from '../components/ExpensiveComponent'; // Importa el componente costoso
const { Title } = Typography;

const Page1 = () => {

    // Estado para almacenar los elementos de la lista
    const [items, setItems] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [confirmedItems, setConfirmedItems] = useState([]); // Estado para elementos confirmados

      // Función para agregar un nuevo elemento a la lista
    const addItem = () => {
      if (inputValue.trim() && !items.some(item => item.name === inputValue.trim())) {
        const newItem = { id: Date.now(), name: inputValue };
        setItems(prevItems => [...prevItems, newItem]);
        setInputValue('');
      } else {
        alert('El nombre ya existe en la lista');
      }
    };

      //- Funcion para confirmar un elemento de la lista  
    const handleConfirm = (id) => {
      setConfirmedItems(prev => [...prev, id]); // Guarda los elementos confirmados
    };
    // Función para eliminar un elemento de la lista
    const removeItem = (id) => {
      setItems(prevItems => prevItems.filter(item => item.id !== id));
    };


    return (
      <Card title="Tareas" style={{ width: 800, margin: 'auto', marginTop: 50, textAlign: 'center' }}>
        <Space direction="vertical" style={{ width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Input
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              placeholder="Escribe un tarea..."
              style={{ flex: 1 }}
            />
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={addItem}
              disabled={!inputValue.trim()}
            >
              Agregar
            </Button>
          </div>
        </Space>
        <Title level={4} style={{ marginTop: 20 }}>Lista de Tareas</Title>
        <List
        bordered
        dataSource={items}
        renderItem={item => (
          <List.Item
            key={item.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              backgroundColor: confirmedItems.includes(item.id) ? '#36b950' : 'default', // Aplica color si está confirmado
            }}     
            actions={[
              <Button 
                type="primary" 
                icon={<CheckOutlined />} 
                onClick={() => handleConfirm(item.id)} // Marca el elemento
              >
                Confirmar
              </Button>,
              <Button 
              type="danger" 
              icon={<DeleteOutlined />} 
              onClick={() => removeItem(item.id)}
              disabled={confirmedItems.includes(item.id)} // Deshabilita si está confirmado
            >
              Eliminar
            </Button>
            ]}
          >
            <ExpensiveComponent data={[item]} />
          </List.Item>
        )}
      />
      </Card>
    );
};

 

export default Page1;
