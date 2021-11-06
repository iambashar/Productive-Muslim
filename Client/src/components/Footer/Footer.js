import React, { useEffect, useState } from 'react';
import './Footer.css'
import { Form, Button } from 'react-bootstrap';
import emailjs from 'emailjs-com'
import { useAuth } from '../../components/Authentication/AuthContext'; 

const Footer = () => {
    const [modal, setModal] = useState(false);
    const [email, setEmail] = useState();
    const [name, setName] = useState();
    const { currentUser } = useAuth();
  
    useEffect(() => {
        if(currentUser != null)
        {
            console.log(currentUser);
            setEmail(currentUser.email);
            setName(currentUser.displayName);
        }
        document.getElementsByClassName("contactLink")[0].style.setProperty("text-decoration", "underline");
        
    }, []);

    const togglePopUp = () => {
        if (modal) {
            setModal(false);
        }
        else {
            setModal(true);
            
        }

    }


    const sendEmail = (e) => {
        e.preventDefault();
    
        emailjs.sendForm('service_k9mhf6a', 'template_gzy07xl', e.target, 'user_h5X8uPzDtZgUtgmSD6wmW')
          .then((result) => {
          }, (error) => {
              console.log(error.text);
          });
          togglePopUp();
          //console.log(document.getElementsByName("usermail")[0].value);
      };

    return (
        <div>
            <div className={modal ? "popUp" : "popUpHide"} id="popUp">
                <Form onSubmit={sendEmail}>
                    <Form.Group className="mb-3" >
                        <div>
                            <input type="radio" value="rifatraiyan@iut-dhaka.edu" name="emailID" className="radio"/>
                            <label className="radio" for="rifat">Syed Rifat Raiyan, 180041205</label><br/>
                            <input type="radio" value="samiaislam@iut-dhaka.edu" name="emailID" className="radio" autocomplete="off"/> 
                            <label className="radio" for="samia">Samia Islam, 180041237</label><br/>
                            <input type="radio" value="bashar38@iut-dhaka.edu" name="emailID"  className="radio"/> 
                            <label className="radio" for="bashar">M. K. Bashar, 180041238</label>
                        </div>
                        <Form.Control id="subject" name="user_subject" type="text" placeholder="Subject" /><br/>
                        <Form.Control id="name" name="user_name" type="text" value={name} style={{display: "none"}}/>
                        <Form.Control id="usermail" name="user_mail" type="email" value={email} style={{display: "none"}}/>
                        <Form.Control id="mail" name="user_message" as="textarea" placeholder="Message" rows={3} />
                    </Form.Group>
                    <Button type="submit" id="sendbtn" >
                        Send
                    </Button>
                </Form>
            </div>
            <div className="main-footer">
                <div>
                    <p className="footerText">From the love for Islam...</p>
                    <a href="#" className="contactLink" onClick={togglePopUp}>Contact us</a>
                </div>
                <div></div>
            </div>
        </div>


    );
};

export default Footer;