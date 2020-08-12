<template>

   <div class="invoice-details-actions border-bottom">

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
    methods: {        
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