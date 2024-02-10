import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonPage, IonText, IonTitle, IonToggle, IonToolbar } from '@ionic/react';
import { trashOutline } from 'ionicons/icons';

const StatusTab: React.FC = () => {
    const [annonce, setAnnonce] = useState<any>(null); // State pour stocker les données de l'annonce
    const annonceId = sessionStorage.getItem('annonceId');
    const token = localStorage.getItem('authToken');

    useEffect(() => {
        // Fonction pour obtenir l'annonce par son ID
        const fetchAnnonce = async () => {
            try {
                const response = await axios.get(`https://vaikaback-production.up.railway.app/annonce/${annonceId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setAnnonce(response.data);
            } catch (error) {
                console.error('Erreur lors de la récupération de l\'annonce :', error);
            }
        };

        fetchAnnonce();
    }, [annonceId, token]);

    const toggleStatus = () => {
        const updatedStatus = annonce.statut === 1 ? 0 : 1; // Inverse le statut actuel
        updateAnnonceStatus(updatedStatus);
    };

    const deletePost = () => {
        axios.delete(`https://vaikaback-production.up.railway.app/annonce/${annonceId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            console.log('Poste supprimé avec succès');
        })
        .catch(error => {
            console.error('Erreur lors de la suppression du poste :', error);
        });
    };

    const updateAnnonceStatus = (newStatus: number) => {
        axios.patch(`https://vaikaback-production.up.railway.app/annonce/${annonceId}/statut?statut=${newStatus}`, null, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            setAnnonce(prevAnnonce => ({
                ...prevAnnonce,
                statut: newStatus
            }));
            console.log('Statut de l\'annonce mis à jour avec succès');
        })
        .catch(error => {
            console.error('Erreur lors de la mise à jour du statut de l\'annonce :', error);
        });
    };

    return (
        <IonPage>
            <IonHeader>              
                <IonToolbar color={'secondary'}>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/app" />
                    </IonButtons>
                    <IonTitle>Statut</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                {annonce && (
                    <div>
                        <div className="statut-grid">
                            <IonText>{annonce.statut === 1 ? 'En vente' : 'Vendu'}</IonText>
                            <IonToggle name="statusToggle" color="secondary" checked={annonce.statut === 1} onIonChange={toggleStatus} />
                        </div>
                        <div className="statut-grid">
                            <IonText>Supprimer le poste</IonText>
                            <IonButton onClick={deletePost} color="danger">
                                <IonIcon icon={trashOutline} />
                            </IonButton>
                        </div>
                    </div>
                )}
            </IonContent>
        </IonPage>
    );
};

export default StatusTab;
