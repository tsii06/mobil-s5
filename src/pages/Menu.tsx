import { IonButton, IonContent, IonHeader, IonIcon, IonItem, IonMenu, IonMenuToggle, IonPage, IonRouterOutlet, IonSplitPane, IonTitle, IonToolbar } from '@ionic/react';
import { homeOutline, logOutOutline, newspaperOutline } from 'ionicons/icons';
import React from 'react';
import { Redirect, Route } from 'react-router';
import List from './List';
import Settings from './Settings';

const Menu: React.FC = () => {
    const paths = [
        { name:'Accueil', url:'/app/list',icon:homeOutline},
        { name:'Publication',url:'/app/settings',icon:newspaperOutline}
    ]
    return (
        <IonPage>
            <IonSplitPane contentId='main' when='md'>
            <IonMenu contentId='main'>
            <IonHeader>
                <IonToolbar color={'secondary'}>
                    <IonTitle>Menu</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                {paths.map((item,index)=>(
                    <IonMenuToggle key={index} autoHide={false}>
                        <IonItem detail={false} routerLink={item.url} routerDirection='none'>
                            <IonIcon slot='start' icon={item.icon}/>
                            {item.name}
                        </IonItem>
                    </IonMenuToggle>             
                ))}
                <IonMenuToggle autoHide={false}>
                        <IonButton className='ion-margin-top' expand='full' routerLink='/' routerDirection='none'>
                            <IonIcon slot='start' icon={logOutOutline}/>
                            Logout
                        </IonButton>
                    </IonMenuToggle>  
            </IonContent>
            </IonMenu>
            
            <IonRouterOutlet id='main'>
                <Route exact path='/app/list' component={List}/>
                <Route path='/app/settings' component={Settings}/>
                <Route exact path='/app'><Redirect to='/app/list'/></Route>
                
            </IonRouterOutlet>
            </IonSplitPane>
        </IonPage>
    );
};

export default Menu;