<template>
    <div class="invoice-details-wpr">
            
        <!-- Invoice Actions Component -->
        <invoice-actions @invoiceAction="invoiceAction" :send_invoice="send_invoice"/>
        <!-- / Invoice Actions Component -->

        <!-- Invoice Currency Component -->
        <invoice-currency @invoiceCurrencyUpdated="invoiceCurrencyUpdated" />
        <!-- / Invoice Currency Component -->

        <!-- Invoice Extra Options -->
        <div class="invoice-details-options border-bottom">

            <div class="checkbox-group">
                <input type="checkbox" id="invoice_notes" value="invoice_notes" v-model="invoice_options.invoice_extras" @change="invoiceOptionsUpdated">
                <label for="invoice_notes">notes</label>
            </div>
            
            <div class="checkbox-group">
                <input type="checkbox" id="invoice_fees" value="invoice_late_fees" v-model="invoice_options.invoice_extras" @change="invoiceOptionsUpdated">
                <label for="invoice_fees">late fees</label>
            </div>

        </div>
    </div>

</template>

<script>

import InvoiceCurrency from "@/components/InvoiceCurrency.vue";
import InvoiceActions from "@/components/InvoiceActions.vue";

export default {
    name: 'invoice-options',
    props: ['invoice'],
    data() {
        return {
            invoice_data: {},
            invoice_options: {
                currency: {},
                invoice_extras: [],
            },
            send_invoice: false,
        }
    },
    
    components: {
        InvoiceCurrency,
        InvoiceActions,
    }, 
    methods: {
        invoiceOptionsUpdated(){
            this.$emit('invoiceOptionsUpdated', this.invoice_options);             
        },

        // Invoice Currency Update
        invoiceCurrencyUpdated(currency){
            this.invoice_options.currency = currency;            
            this.$emit('invoiceOptionsUpdated', this.invoice_options);     
        },

        // Invoice Actions
        invoiceAction(action){
            if(action == "send") {
                this.$emit('sendInvoice', 'send');                 

            } else if (action == "preview") {  
                this.$emit('previewInvoice', 'preview');  

            } else {       
                this.$emit('downloadInvoice', 'download');  
            }
        },
    }

}

</script>