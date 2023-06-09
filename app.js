const contentMain = document.getElementById("content__builder__page");

let option_edit = "";
let element_clicked = {};

const getElementContainerEdit = () => {
  return document.getElementById('properties');
}

const getElementTextareaEdit = () => {
  return document.getElementsByClassName('properties__text__area')[0];
}

const closeEditProperties = () => {
  try {
    const elementSelected = document.querySelector('.active__edit__properties');
    elementSelected.classList.remove("active__edit__properties");
    element_clicked = {};
    contentMain.removeChild(getElementContainerEdit());
  } catch (error) {
    return;
  }
}

document.addEventListener("keyup", (event) => event.key === 'Escape' && closeEditProperties());

function selectOptionEditProperties(option) {
  option_edit = option;
  const option_button = document.getElementById(option);

  try {
    const option_buttons_s = document.querySelector("#edit__styles");
    option_buttons_s.style.background = "#fff";
  } catch (error) {
    
  }

  try {
    const option_buttons_t = document.querySelector("#edit__text");
    option_buttons_t.style.background = "#fff";  
  } catch (error) {
    
  }

  option_button.style.background = "#b5b5b5";

  if (option == "edit__text") {
    const elementSelected = document.querySelector('.active__edit__properties');
    getElementTextareaEdit().value = elementSelected.innerHTML;
  }
  if (option == "edit__styles") {
    getElementTextareaEdit().value = "";
  }
}

contentMain.addEventListener("click", (e) => {
  if (!getElementContainerEdit() && e.target.className !== "properties" && e.target.id !== "properties") {
    e.target.className = "active__edit__properties"
    const div_container = document.createElement('div');
    const text_properties = document.createElement("textarea");
    text_properties.className = "properties__text__area";
    div_container.className = "properties";
    div_container.id = "properties";
    div_container.name = "properties";
    
    div_container.appendChild(text_properties);

    text_properties.addEventListener('keyup', element_text_propertie => {
      if(element_text_propertie.key !== 'Escape') {
        if (option_edit === "edit__styles") {
          const list_styles = element_text_propertie.target.value.split(/\n/g);       
          const item_style = list_styles.map(e => e.replace(";", "").split(/:\s+/));
          const items_style_availlable = Object.fromEntries(item_style.map(([key, value]) => {
            if (value) return [key.replace(":", ""), value];
          }).filter(e => e));
          Object.assign(e.target.style, items_style_availlable);
        }
        if (option_edit === "edit__text") {
          const elementSelected = document.querySelector('.active__edit__properties');
          elementSelected.innerHTML = text_properties.value;
        }
      }
    });

    const div_button_option = document.createElement('div');

    div_button_option.innerHTML = `
      ${!/(DIV)/.test(e.target.nodeName) ? `
        <button 
          id="edit__text" 
          onclick="selectOptionEditProperties('edit__text', this)" 
          class="button__option__edit__properties"
        >
          Texto
        </button>
      `:""}
      <button 
        id="edit__styles" 
        onclick="selectOptionEditProperties('edit__styles', this)" 
        class="button__option__edit__properties"
      >
        Estilos
      </button>
    `;

    div_container.appendChild(div_button_option);
    contentMain.appendChild(div_container);

    div_container.style.position = "fixed";
    div_container.style.top = e.clientY+'px';
    div_container.style.left = e.clientX+'px';
    text_properties.focus();
    if (!/(DIV)/.test(e.target.nodeName)) {
      selectOptionEditProperties('edit__text', e);
    } else {
      selectOptionEditProperties('edit__styles', e);
    }
  }
})

