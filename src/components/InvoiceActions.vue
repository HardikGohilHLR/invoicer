<template>

   <div class="invoice-details-actions border-bottom">
        <!-- <div class="send-invoice">
            <button class="btn black-btn" @click="sendInvoice">
                <i class="fab fa-telegram-plane"></i>
                send invoice
            </button>
            <span class="user-note" v-if="!send_invoice_able">Please Log in with google to send invoice..</span>
        </div> -->

        <div class="send-invoice">
            <button class="btn black-btn preview-btn" @click="previewInvoice">
                <i class="fab fa-telegram-plane"></i>
                preview
            </button>
        </div>
        <div class="send-invoice">
            <button class="btn blue-btn download-btn" @click="downloadInvoice">
                <i class="fas fa-file-download"></i>
                download
            </button>
        </div>

    </div>

</template>

<script>
export default {
    name: 'invoice-actions',
    props: ['send_invoice'],
    data(){
        return {
            send_invoice_able: true
        }
    },
    methods: {
        // Send Invoice
        // sendInvoice(){
        //     if(this.send_invoice){
        //         this.send_invoice_able = true;             
        //         this.$emit('invoiceAction', 'send');
        //     } else {                
        //         this.send_invoice_able = false;                
        //     }
        // },
        
        // Preview Invoice
        previewInvoice(){
            this.$emit('invoiceAction', 'preview');
        },

        // Download Invoice
        downloadInvoice(){
            this.$emit('invoiceAction', 'download');
        }
    }
}
</script>