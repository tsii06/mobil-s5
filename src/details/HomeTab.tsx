import React, { useEffect, useState } from 'react';
import { IonBackButton, IonButtons, IonContent, IonHeader, IonItem, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import axios from 'axios';

interface CarDetails {
}

const HomeTab: React.FC = () => {
  const [carDetails, setCarDetails] = useState<CarDetails | null>(null);
  const token = localStorage.getItem('authToken');
  const annonceId = sessionStorage.getItem('annonceId');

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const response = await axios.get<CarDetails>(`https://vaikaback-production.up.railway.app/annonce/${annonceId}`, {
          headers: {
            'Authorization': `Bearer ${token}` // Ajouter le token à l'en-tête Authorization
          }
        });
        setCarDetails(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching car details:', error);
      }
    };

    fetchCarDetails();
  }, [token]);

  return (
    <IonPage>
            <IonHeader>              
                <IonToolbar color={'secondary'}>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/app" />
                    </IonButtons>
                    <IonTitle>Details</IonTitle>
                </IonToolbar>
            </IonHeader>
    <IonContent>
    <div className="detail-grid">
      {carDetails && (
        <>
          <IonItem>
            <p>Catégorie: {carDetails.voiture.categorie.nom}</p>
          </IonItem>
          <IonItem>
            <p>Modèle: {carDetails.voiture.modele.nom}</p>
          </IonItem>
          <IonItem>
            <p>Marque: {carDetails.voiture.marque.nom}</p>
          </IonItem>
          <IonItem>
            <p>Kilométrage: {carDetails.voiture.kilometrage}</p>
          </IonItem>
          <IonItem>
            <p>Année: {carDetails.voiture.annee}</p>
          </IonItem>
          <IonItem>
            <p>Nombre de places: {carDetails.voiture.nombrePlace}</p>
          </IonItem>
          <IonItem>
            <p>Prix: {carDetails.voiture.prix}</p>
          </IonItem>
        </>
      )}
    </div>
    </IonContent>
    </IonPage>
  );
};

export default HomeTab;
