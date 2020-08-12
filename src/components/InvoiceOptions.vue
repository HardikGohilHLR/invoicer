<template>
    <div class="invoice-details-wpr">            
        <!-- Invoice Actions Component -->
        <invoice-actions :send_invoice="send_invoice"/>
        <!-- / Invoice Actions Component -->

        <!-- Invoice Extra Options -->
        <div class="invoice-details-options border-bottom">

            <div class="checkbox-group">
                <input type="checkbox" id="invoice_notes" value="invoice_notes" v-model="invoice_options.invoice_extras" >
                <label for="invoice_notes">notes</label>
            </div>
            
            <div class="checkbox-group">
                <input type="checkbox" id="invoice_fees" value="invoice_late_fees" v-model="invoice_options.invoice_extras" >
                <label for="invoice_fees">late fees</label>
            </div>

        </div>

    </div>

</template>

<script>
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
        InvoiceActions
    }, 
    methods: {
    }

}

</script>