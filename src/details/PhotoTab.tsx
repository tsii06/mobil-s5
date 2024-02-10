import React, { useEffect, useState } from 'react';
import { IonContent, IonHeader, IonImg, IonPage, IonTitle, IonToolbar, IonSpinner, IonBackButton, IonButtons } from '@ionic/react';
import axios from 'axios';

interface Photo {
    idAnnonce: string;
    path: string;
}

const PhotosTab: React.FC = () => {
    const [photos, setPhotos] = useState<Photo[]>([]); // Déclaration de l'état pour stocker les photos
    const [loading, setLoading] = useState<boolean>(true); // État pour suivre le chargement
    const token = localStorage.getItem('authToken');
    const annonceId = sessionStorage.getItem('annonceId');
    console.log(annonceId)

    useEffect(() => {
        const fetchPhotos = async () => {
            try {
                const response = await axios.get<Photo[]>(`https://vaikaback-production.up.railway.app/photos/${annonceId}`, {
                                                            
                    headers: {
                        'Authorization': `Bearer ${token}` // Ajouter le token à l'en-tête Authorization
                    }
                });
                setPhotos(response.data);
                setLoading(false); // Mettre le chargement à false une fois les photos chargées
            } catch (error) {
                console.error('Error fetching photos:', error);
                setLoading(false); // En cas d'erreur, mettre le chargement à false pour arrêter l'indication de chargement
            }
        };

        fetchPhotos();
    }, [token, annonceId]); // Le tableau de dépendances pour useEffect assure que fetchPhotos est rappelé lorsque le token ou l'annonceId changent

    return (
        <IonPage>
            <IonHeader>              
                <IonToolbar color={'secondary'}>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/app" />
                    </IonButtons>
                    <IonTitle>Photos</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                {loading ? ( // Si loading est vrai, afficher l'indicateur de chargement
                    <IonSpinner />
                ) : (
                    <div className="photo-grid">
                        {photos.map((photo, index) => (
                            <IonImg key={index} src={`data:image/jpeg;base64,${photo.path}`} className="grid-item" alt={`Photo ${index}`} />
                        ))}
                    </div>
                )}
            </IonContent>
        </IonPage>
    );
};

export default PhotosTab;
