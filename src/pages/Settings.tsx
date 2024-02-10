import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    IonTextarea,
    IonCard,
    IonCardContent,
    IonItem,
    IonLabel,
    IonButtons,
    IonMenuButton,
    IonInput,
    IonSelect,
    IonSelectOption
} from '@ionic/react';

const Settings: React.FC = () => {
    const token = localStorage.getItem('authToken');
    const idUtilisateur = localStorage.getItem('idUser');
    const [detailsVoiture, setDetailsVoiture] = useState({
        categorie: '',
        marque: '',
        modele: '',
        carburant: '',
        description: '',
        prix: '',
        kilometrage: '',
        nombrePlaces: '',
        annee: ''
    });

    const [categoriesVoiture, setCategoriesVoiture] = useState([]);
    const [categorieSelectionnee, setCategorieSelectionnee] = useState('');
    const [marquesVoiture, setMarquesVoiture] = useState([]);
    const [marqueSelectionnee, setMarqueSelectionnee] = useState('');
    const [modelesVoiture, setModelesVoiture] = useState([]);
    const [modeleSelectionne, setModeleSelectionne] = useState('');
    const [carburantsVoiture, setCarburantsVoiture] = useState([]);
    const [carburantSelectionne, setCarburantSelectionne] = useState('');

    useEffect(() => {
      const fetchData = async (url, setter) => {
        try {
            const response = await fetch(url, {
                headers: {
                  Authorization: `Bearer ${token}`, // Ajouter le token à l'en-tête Authorization
                },
              });
          if (response.ok) {
            const data = await response.json();
            setter(data);
          } else {
            console.error(`Échec de la récupération des données depuis ${url}`);
          }
        } catch (error) {
          console.error('Erreur lors de la récupération des données :', error);
        }
      };

      fetchData('https://vaikaback-production.up.railway.app/modeles', setModelesVoiture);
      fetchData('https://vaikaback-production.up.railway.app/categories', setCategoriesVoiture);
      fetchData('https://vaikaback-production.up.railway.app/marques', setMarquesVoiture);
      fetchData('https://vaikaback-production.up.railway.app/carburants', setCarburantsVoiture);
    }, []);

    const handleCategorieChange = (event) => {
      setCategorieSelectionnee(event.target.value);
      setDetailsVoiture({ ...detailsVoiture, categorie: event.target.value });
    };

    const handleMarqueChange = (event) => {
      setMarqueSelectionnee(event.target.value);
      setDetailsVoiture({ ...detailsVoiture, marque: event.target.value });
    };

    const handleModeleChange = (event) => {
      setModeleSelectionne(event.target.value);
      setDetailsVoiture({ ...detailsVoiture, modele: event.target.value });
    };

    const handleCarburantChange = (event) => {
      setCarburantSelectionne(event.target.value);
      setDetailsVoiture({ ...detailsVoiture, carburant: event.target.value });
    };

    const handleDescriptionChange = (event) => {
      setDetailsVoiture({ ...detailsVoiture, description: event.target.value });
    };

    const handlePrixChange = (event) => {
      setDetailsVoiture({ ...detailsVoiture, prix: event.target.value });
    };

    const handleKilometrageChange = (event) => {
      setDetailsVoiture({ ...detailsVoiture, kilometrage: event.target.value });
    };

    const handleNombrePlacesChange = (event) => {
      setDetailsVoiture({ ...detailsVoiture, nombrePlaces: event.target.value });
    };

    const handleAnneeChange = (event) => {
      setDetailsVoiture({ ...detailsVoiture, annee: event.target.value });
    };


    const history = useHistory();

    const handleSubmit = () => {
      // Créer un objet à envoyer à l'API
      const corpsRequeteVoiture = {
          marque: { idMarque: detailsVoiture.marque },
          categorie: { idCategorie: detailsVoiture.categorie },
          modele: { idModele: detailsVoiture.modele },
          carburant: { idCarburant: detailsVoiture.carburant },
          annee: detailsVoiture.annee,
          kilometrage: detailsVoiture.kilometrage,
          nombrePlace: detailsVoiture.nombrePlaces,
          prix: detailsVoiture.prix
      };
      console.log(corpsRequeteVoiture);
    // Insérer la voiture
    fetch('https://vaikaback-production.up.railway.app/voiture', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(corpsRequeteVoiture),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Réponse réseau non valide');
        }
        return response.json();
    })
    .then(voitureData => {
    // Une fois la voiture insérée avec succès, insérer l'annonce
    const corpsAnnonce = {
        dateAnnonce: new Date().toISOString(),
        utilisateur: {
            idUtilisateur: idUtilisateur
        },
        voiture: {
            idVoiture: voitureData.idVoiture, // Utilisez l'idVoiture renvoyé par la réponse de la première requête
        },
        statut: 0,
        description: detailsVoiture.description
    };
    
    return fetch('https://vaikaback-production.up.railway.app/annonce', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(corpsAnnonce),
    });
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Réponse réseau non valide');
        }
        return response.json();
    })
    .then(annonceData => {
        const idAnnonce = annonceData.idAnnonce; // Utilisez l'idAnnonce renvoyé par la réponse de la deuxième requête
        console.log(idAnnonce);
        history.push(`/page-suivante/${idAnnonce}`);
    })
    .catch(error => {
        console.error('Problème avec l\'opération fetch :', error);
    });

    
  };

    return (
        <IonPage>
            <IonHeader>              
                <IonToolbar color={'secondary'}>
                    <IonButtons slot='start'>
                        <IonMenuButton></IonMenuButton>
                    </IonButtons>
                    <IonTitle>Publication de Voiture</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <IonCard>
                    <IonCardContent>
                        <IonItem>
                            <IonLabel position="floating">Catégorie de Voiture</IonLabel>
                            <IonSelect value={categorieSelectionnee} placeholder="Sélectionner la Catégorie de Voiture" onIonChange={handleCategorieChange} >
                                {categoriesVoiture.map((categorie) => (
                                    <IonSelectOption key={categorie.idCategorie} value={categorie.idCategorie}>
                                        {categorie.nom}
                                    </IonSelectOption>
                                ))}
                            </IonSelect>
                        </IonItem>

                        <IonItem>
                            <IonLabel position="floating">Marque de Voiture</IonLabel>
                            <IonSelect value={marqueSelectionnee} placeholder="Sélectionner la Marque de Voiture" onIonChange={handleMarqueChange} >
                                {marquesVoiture.map((marque) => (
                                    <IonSelectOption key={marque.idMarque} value={marque.idMarque}>
                                        {marque.nom}
                                    </IonSelectOption>
                                ))}
                                </IonSelect>
                        </IonItem>
                        
                        <IonItem>
                            <IonLabel position="floating">Marque de Voiture</IonLabel>
                            <IonSelect value={modeleSelectionne} placeholder="Sélectionner la Marque de Voiture" onIonChange={handleModeleChange} >
                                {modelesVoiture.map((modele) => (
                                    <IonSelectOption key={modele.idModele} value={modele.idModele}>
                                        {modele.nom}
                                    </IonSelectOption>
                                ))}
                                </IonSelect>
                        </IonItem>
                        <IonItem>
                            <IonLabel position="floating">Marque de Voiture</IonLabel>
                            <IonSelect value={carburantSelectionne} placeholder="Sélectionner la Marque de Voiture" onIonChange={handleCarburantChange} >
                                {carburantsVoiture.map((carburant) => (
                                    <IonSelectOption key={carburant.idCarburant} value={carburant.idCarburant}>
                                        {carburant.nom}
                                    </IonSelectOption>
                                ))}
                                </IonSelect>
                        </IonItem>
                        <IonItem>
                            <IonLabel position="floating">Description</IonLabel>
                            <IonTextarea value={detailsVoiture.description} onIonChange={handleDescriptionChange}></IonTextarea>
                        </IonItem>

                        <IonItem>
                            <IonLabel position="floating">Price</IonLabel>
                            <IonInput type="number" value={detailsVoiture.prix} onIonChange={handlePrixChange}></IonInput>
                        </IonItem>

                        <IonItem>
                            <IonLabel position="floating">Mileage</IonLabel>
                            <IonInput type="number" value={detailsVoiture.kilometrage} onIonChange={handleKilometrageChange}></IonInput>
                        </IonItem>

                        <IonItem>
                            <IonLabel position="floating">Number of Seats</IonLabel>
                            <IonInput type="number" value={detailsVoiture.nombrePlaces} onIonChange={handleNombrePlacesChange}></IonInput>
                        </IonItem>

                        <IonItem>
                            <IonLabel position="floating">Year of Manufacture</IonLabel>
                            <IonInput type="number" value={detailsVoiture.annee} onIonChange={handleAnneeChange}></IonInput>
                        </IonItem>

                        <IonButton expand="full" onClick={handleSubmit}>Submit</IonButton>
                    </IonCardContent>
                </IonCard>
            </IonContent>
        </IonPage>
    );
};

export default Settings;
