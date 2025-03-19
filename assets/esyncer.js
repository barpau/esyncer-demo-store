document.addEventListener("DOMContentLoaded", function(event) {
    // Přidáme CSS pro skrytí elementu s tier-price variantami
    const style = document.createElement('style');
    style.textContent = `
        div[option-name*="Tier Price"] {
            display: none !important;
        }
    `;
    document.head.appendChild(style);

    // Přidáme CSS pro skrytí celého elementu s variantami cen
    const style2 = document.createElement('style');
    style2.textContent = `
        #swatch-option2 {
            display: none !important;
        }
    `;
    document.head.appendChild(style2);

    // Přidáme CSS pro skrytí labelu
    const style3 = document.createElement('style');
    style3.textContent = `
        div.swatch-preset-679805 label.swatch-label 
            display: none !important;
        }
    `;
    document.head.appendChild(style3);

    // Check if an element with the class "esyncer_4over_select_boxes" exists
    var fourover_element = document.querySelector(".esyncer_4over_select_boxes");

    // If the element exists, trigger your action
    if (fourover_element) {
      let scriptEle = document.createElement("script");
      scriptEle.setAttribute("src", "https://app.esyncer.com/js/fo.js?v=" + Math.floor(Math.random() * 100000000));
      document.body.appendChild(scriptEle);
    } else {
      console.log("Element with class 'esyncer_4over_select_boxes' not found.");
    }

    // Kód pro sledování množství a změnu varianty
    const quantityInput = document.querySelector('input[name="quantity"]');
    if (quantityInput) {
      quantityInput.addEventListener('change', function(e) {
        const quantity = parseInt(e.target.value);
        console.log('Množství produktu změněno na:', quantity);
        
        const priceVariants = document.querySelectorAll('#swatch-option2 .swatch-view-item');
        
        const selectVariant = (variant) => {
          const button = variant.querySelector('.swatch-button');
          if (button && !button.classList.contains('swatch-selected')) {
            const originalQuantity = quantity;
            
            // Funkce pro obnovení množství
            const restoreQuantity = () => {
              // Počkáme na dokončení všech AJAX požadavků
              setTimeout(() => {
                // Nastavíme hodnotu přímo na input
                quantityInput.value = originalQuantity;
                quantityInput.setAttribute('value', originalQuantity);
                
                // Aktualizujeme data atribut
                quantityInput.dataset.quantity = originalQuantity;
                quantityInput.setAttribute('data-cart-quantity', originalQuantity);
                
                // Aktualizujeme quantity-input komponentu
                const quantityComponent = quantityInput.closest('quantity-input');
                if (quantityComponent) {
                  // Aktualizujeme všechny související inputy
                  quantityComponent.querySelectorAll('input[name="quantity"]').forEach(input => {
                    input.value = originalQuantity;
                    input.setAttribute('value', originalQuantity);
                  });
                  
                  // Aktivujeme/deaktivujeme tlačítka + a -
                  const minusButton = quantityComponent.querySelector('button[name="minus"]');
                  if (minusButton) {
                    minusButton.classList.toggle('disabled', originalQuantity <= 1);
                  }
                  
                  // Vyvoláme události v správném pořadí
                  ['input', 'change', 'blur'].forEach(eventType => {
                    quantityInput.dispatchEvent(new Event(eventType, { bubbles: true }));
                  });
                }
                
                // Pro jistotu nastavíme ještě jednou po krátké prodlevě
                setTimeout(() => {
                  quantityInput.value = originalQuantity;
                }, 50);
              }, 200);
            };

            // Nastavíme observer před kliknutím
            const observer = new MutationObserver((mutations) => {
              restoreQuantity();
              setTimeout(() => {
                observer.disconnect();
              }, 500);
            });
            
            observer.observe(quantityInput.closest('quantity-input') || quantityInput, {
              attributes: true,
              childList: true,
              subtree: true
            });
            
            button.click();
            
            // Záložní timeout
            setTimeout(restoreQuantity, 300);
          }
        };

        // Vybereme správnou variantu podle množství
        if (quantity >= 100) {
          selectVariant(Array.from(priceVariants).find(v => v.getAttribute('orig-value') === '100'));
        } else if (quantity >= 60) {
          selectVariant(Array.from(priceVariants).find(v => v.getAttribute('orig-value') === '60'));
        } else if (quantity >= 40) {
          selectVariant(Array.from(priceVariants).find(v => v.getAttribute('orig-value') === '40'));
        } else if (quantity >= 20) {
          selectVariant(Array.from(priceVariants).find(v => v.getAttribute('orig-value') === '20'));
        } else if (quantity >= 6) {
          selectVariant(Array.from(priceVariants).find(v => v.getAttribute('orig-value') === '6'));
        }
      });
    } else {
      console.log("Input pro množství produktu nebyl nalezen");
    }
});





