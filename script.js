document.addEventListener("DOMContentLoaded", function(){



    /* Custom elements for Nav Bar, Contact Page, and Footer Page*/

    class SpecialNav extends HTMLElement {
        connectedCallback(){
            this.innerHTML = `
                <header>
                    <nav>
                        <img src="Assets/Icons/logoImage.png" alt="">
                        <div class="right">
                            <a class="navLinks" href="">Menu</a>
                            <a class="navLinks" href="">Hours</a>
                            <a class="navLinks" href="">Gallery</a>
                            <a class="navLinks" href="">Contact Us</a>
                        </div>
                    </nav>
                </header>
            `;
        }
    }

    class SpecialContact extends HTMLElement {
        connectedCallback(){
            this.innerHTML = `
                <section class="contactUs">
                    <h4>Contact Us</h4>
                    <div class="more">
                        <iframe class="mapEmbed" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3351.9083745444614!2d-96.9935045248878!3d32.84767758037252!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x864e837caf4f1189%3A0xabb9ca7f37d9754a!2sDhido%20nepali%20restaurant%20%26%201%20Stop%20Meat%20Shop!5e0!3m2!1sen!2sus!4v1734032886827!5m2!1sen!2sus" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                        <div class="contactUsMore">
                            <h6>Get In Touch</h6>
                            <form class="contactForm">
                                <input class="contactInputs" type="text" id="name" name="name" required placeholder="Name*">
            
                                <input class="contactInputs" type="email" id="email" name="email" required placeholder="example@email.com*">
            
                                <input class="contactInputs" type="tel" id="phone" name="tel" placeholder="123-456-7890">                    
                                <textarea class="contactInputs" id="message" name="message" placeholder="Your Message*"></textarea>
                                <button class="redButton" id="sendButton">Send Message</button>
                                <p id="feedbackMessage" style="display: none;"></p>
                            </form>
                        </div>
                    </div>
                </section>
            `;
        }
    }

    class SpecialFooter extends HTMLElement {
        connectedCallback(){
            this.innerHTML = `
                <footer>
                    <div class="top">
                        <div class="col1">
                            <h6>
                                Dhido Nepali Restaurant <br> & One Stop Meat Shop
                            </h6>
                            <div class="socials">
                                <div class="socials">
                                    <div class="social-item">
                                    <i class="fas fa-phone-alt"></i>
                                    <a href="tel:+19726009042">+1 (972) 600-9042</a>
                                    </div>
                                    <div class="social-item">
                                    <i class="fas fa-envelope"></i>
                                    <a href="mailto:dhidonepalirestaurant3305@gmail.com">dhidonepalirestaurant3305@gmail.com</a>
                                    </div>
                                    <div class="social-item">
                                    <i class="fas fa-map-marker-alt"></i>
                                    <a href="https://maps.app.goo.gl/YmKfptfizuGyrTmW7" target="_blank">
                                        3305 W Rochelle Rd, Irving, TX 75062
                                    </a>
                                    </div>
                                </div>
                            </div>                  
                        </div>
                        <div class="col2">
                            <h6>Information</h6>
                            <p>Recommended Items</p>
                            <p>Full Menu</p>
                            <p>Reviews</p>
                            <p>About Us</p>
                            <p>Gallery</p>
                            <p>Contact Us</p>
                        </div>
                        <div class="col3">
                            <h6>Opening Hours</h6>
                            <p>Monday: Closed</p>
                            <p>Tuesday: 9AM - 1AM</p>
                            <p>Wednesday: 9AM - 1AM</p>
                            <p>Thurday: 9AM - 1AM</p>
                            <p>Friday: 9AM - 1AM</p>
                            <p>Saturday: 9AM - 1AM</p>
                            <p>Sunday: 9AM - 1AM</p>
                        </div>
                    </div>
                    <div class="bottom">
                        <p>© Dhido Nepali Restaurant & One Stop Meat Shop 2024. All rights reserved.</p>
                        <p>Designed and Developed by <span class="Webspansion">Webspansion</span></p>
                    </div>
                </footer>
            `;
        }
    }

    customElements.define('special-nav', SpecialNav);
    customElements.define('special-contact', SpecialContact);
    customElements.define('special-footer', SpecialFooter);














    /* 
    
    Dynamic Website Changes
    
    */
    



    //Custom URL based on Data Set by HTML

    const menuItems = document.querySelectorAll(".menu-item");

    if (menuItems){
        menuItems.forEach((item) => {
            item.addEventListener("click", () =>{

                const type = item.dataset.type;
                const name = item.dataset.name;
    
                if((!type) || (!name)){
                    console.log("Type and Name Not found");
                } else{
                    console.log("Type and Name found: ", type, name );
                }



                const customURL = `individual-item.html?type=${encodeURIComponent(type)}&name=${encodeURIComponent(name)}`;
                console.log("Redirecting to: ", customURL);

                window.location.href = customURL;  

            });
        });
    };





    // Link to JSON File for Menu Data 

    fetch('menuItems.json')
    .then(response => response.json())
    .then(menuData => {




        // Default Item Page

        const defaultItemPage = {
            name: "Item Coming Soon",
            priceReg: "$0.00",
            priceSpicy: "N/A",
            desc: "Item description coming soon. Thank you for patiently waiting. In the meantime, please browse our abvailable items."
        }


        
        menuData.forEach((category) => {
            if (category.items.length === 0){
                category.items.push(defaultItemPage);
            }
        });


        // Get Parameters from the URL


        function getUrlParameters(){
            const params = new URLSearchParams(window.location.search);
            const type = params.get('type')?.trim() || "defaultType";
            const name = params.get('name')?.trim() || "defaultName";


            if (!type || !name) {
                if (!type) {
                    console.log("URL parameter 'type' is missing or empty.");
                }
                if (!name) {
                    console.log("URL parameter 'name' is missing or empty.");
                }
            } else {
                console.log("Successfully loaded 'type' and 'name'.");
            }
        
            

            return{ type, name};
        }

        const paramDetails = getUrlParameters();
        console.log( "Here are the parameters ", paramDetails);


        //Populate each page

        const { type, name } = paramDetails;

        if (type && name){

            const category = menuData.find((cat) => cat.category.toLowerCase() === type.toLowerCase());

            if (category){  
                const menuItem = category.items.find(
                    (item) => item.name.trim().toLowerCase() === name.trim().toLowerCase()
                );

                const templateBlock = document.getElementById("itemTypeBlock");

                const itemCategoryTitle = document.getElementById("itemType");
                itemCategoryTitle.textContent = category.category.toUpperCase() || "Default Category";

               

                category.items.forEach(item => {
                    const itemBlock = templateBlock.cloneNode(true);
                    itemBlock.style.display = "block";
                    // Populate the cloned item block with the current item's details
                    itemBlock.querySelector("#itemNameTitle").textContent = item.name || "Default Name";
                    itemBlock.querySelector("#itemImage").src = `Assets/menuItems/${item.image}`;// Assuming each item has an 'image' property
                    itemBlock.querySelector("#itemImage").src = `Assets/menuItems/pressureCookerMomo.png`;  // Temporary Image of Pressure Cooker Momo (Change Later)
                    itemBlock.querySelector("#itemImage").alt = item.name || "Default Item";
                    itemBlock.querySelector("#itemRegPrice").textContent = `${item.priceReg || "0.00"}`;
                    itemBlock.querySelector("#itemMorePrice").textContent = item.priceSpicy ? `2x Spicy: ${item.priceSpicy}` : (item.priceExtraSoup ? `Extra Soup: ${item.priceExtraSoup}` : ""); 
                    itemBlock.querySelector("#itemDesc").textContent = item.desc || "No description available.";

                    // Append the cloned block to the container
                    itemContainer.appendChild(itemBlock);

                    console.log("Everything works well so far!")
                    
                    const itemNameTitle = itemBlock.querySelector("#itemNameTitle");
                    console.log("itemNameTitle: ", itemNameTitle);

                    console.log("itemNameTitle.textContent:", itemNameTitle.textContent.trim());
                    console.log("name:", name.trim());

                    if (item.name.trim().toLowerCase() === name.trim().toLowerCase()) {
                        console.log("Match found for:", item.name);
                        itemBlock.scrollIntoView({ behavior: "smooth", block: "center" });
                        setTimeout(() => {
                            itemBlock.classList.add("highlightElement");
                        }, 500);
                    }else{
                        console.log("No match found for itemNameTitle:", itemNameTitle?.textContent);
                    }

                }); 
            } else {
                console.log("Category not found.");
            }
        } 



    })
    .catch(error => {
        console.log("Error fetching menu data: ", error);
    })


























































    // Code for Contact Form Email Sending via EmailJS 

    const sendButton = document.querySelector("#sendButton");
    const feedbackMessage = document.querySelector("#feedbackMessage");

    
    sendButton.addEventListener("click", function (event) {
        event.preventDefault();


        let parms = {
            name: document.querySelector("#name").value,
            email: document.querySelector("#email").value,
            phone: document.querySelector("#phone").value || "Number not provided", 
            message: document.querySelector("#message").value,
        }

        if (!parms.name || !parms.email || !parms.message) {
            feedbackMessage.style.display = "block";
            feedbackMessage.style.color = "red";
            feedbackMessage.textContent = "Please fill in all required fields (Name, Email, Message).";
            return;
        }

        emailjs.send("service_pjljivw","template_q4ygvac", parms)
        .then(function (response){

            feedbackMessage.style.display = "block";
            feedbackMessage.style.color = "green";
            feedbackMessage.textContent = "Email has been sent successfully!";
            document.querySelector(".contactForm").reset();
        })
        .catch(function (error){
            feedbackMessage.style.display = "block";
            feedbackMessage.style.color = "red";
            feedbackMessage.textContent = "Something went wrong, please try again later.";
            console.error("Error: ", error);
        });


    });







});



