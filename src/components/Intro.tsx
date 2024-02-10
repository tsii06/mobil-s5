import { IonButton, IonCard, IonCardContent, IonContent, IonHeader, IonPage, IonText, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import  {Swiper, SwiperSlide, useSwiper } from 'swiper/react';

import 'swiper/css'; 


interface ContainerProps {
    onFinish :()=> void;
}

const SwiperButtonNext = ({children}: any) =>{
    const swiper = useSwiper();
    return <IonButton onClick={() =>swiper.slideNext()}>{children} </IonButton>
}

const Intro: React.FC<ContainerProps> = ({onFinish}) => {

    return (
        <Swiper>
            <SwiperSlide>
                <IonCard>
                    <IonCardContent><IonText>Slide 1</IonText></IonCardContent>
                </IonCard>
                <SwiperButtonNext>Next</SwiperButtonNext>
            </SwiperSlide>
            
            <SwiperSlide>
                <IonCard>
                    <IonCardContent><IonText>Slide 2</IonText></IonCardContent>
                </IonCard>
                <SwiperButtonNext>Next</SwiperButtonNext>
            </SwiperSlide>

            <SwiperSlide>
                <IonCard>
                    <IonCardContent><IonText>Slide 2</IonText></IonCardContent>
                </IonCard>
                <IonButton onClick={()=>onFinish()}>Finish</IonButton>
            </SwiperSlide>
            
        </Swiper>
        
    );
};

export default Intro;