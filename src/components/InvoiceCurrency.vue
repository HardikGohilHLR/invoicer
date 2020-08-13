<template>

    <div class="invoice-details-currency border-bottom">
        <p>currency</p>

        <div class="currency-select">
            <div class="currency-flag" :class="`currency-flag-${currency.code.toLowerCase()}`"></div>

            <select v-model="currency"  @change="currencyUpdated">
                <option v-for="currency in currencies" :key="currency.flag" :value="currency">
                    {{ currency.code }} ( {{ currency.name }} )
                </option>
            </select>

        </div>
    </div>

</template>

<script>

export default {
    name: 'invoice-currency',
    data() {
        return {     
            currency: {                 
                code: "INR", 
                name: "Indian rupee", 
                symbol: "₹",
                flag: "https://restcountries.eu/data/ind.svg"                
            },       
            currencies: [],
        }
    },

    created(){     
        fetch('https://restcountries.eu/rest/v2/all')
        .then(response => response.json())
        .then(data => {
            data.forEach(value => {      
                value.currencies[0].flag = value.flag;
                let currency = value.currencies[0];
                this.currencies.push(currency);      
            });
        });

        this.$emit('invoiceCurrencyUpdated', this.currency);             

    },

    methods: {
        currencyUpdated(){            
            this.$emit('invoiceCurrencyUpdated', this.currency);             
        },
    }
}

</script>