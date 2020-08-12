<template>

   <div class="invoice-details-actions border-bottom">
        <div class="send-invoice">
            <button class="btn black-btn">
                <i class="fab fa-telegram-plane"></i>
                send invoice
            </button>
            <span class="user-note" v-if="!send_invoice_able">Please Log in with google to send invoice..</span>
        </div>

        <div class="get-invoice d-flex-sb">
            <button class="btn white-btn preview-btn">
                preview
            </button>
            <button class="btn white-btn download-btn">
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
    }
}
</script>