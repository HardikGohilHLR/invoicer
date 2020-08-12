<template>
    <div class="invoice-final-amount">
        <div class="invoice-total-amount-wpr border-bottom">
            
            <div class="invoice-sub-total d-flex-sb">
                <p>subtotal</p>
                <span>{{ this_invoice_options.currency.symbol }} {{ getSubTotal() }}</span>                            
            </div>

            <slot></slot>    

        </div>
        
        <div class="invoice-total d-flex-sb">
            <p>total</p>
            <span>{{ this_invoice_options.currency.symbol }}{{ total_amount }}</span>    
        </div>

    </div>  
</template>

<script>
export default {
    name: 'invoice-total',
    props: {
        invoice: {},
        invoice_options: {},
        late_fee: {}
    },
    data(){
        return {
            this_invoice: this.invoice,
            this_invoice_options: this.invoice_options,
            total_amount: '',
            sub_total: '',
        }
    },
    
    watch: {
        sub_total(){
            this.getTotalAmount();   
        },
        late_fee(){
            this.getTotalAmount();   
        },
    },
    methods: {
        // Get Sub Total
        getSubTotal(){
            let sub_total = 0;
            this.this_invoice.invoice_items.forEach(item => {
                if(item.disabled == false){
                    sub_total += parseFloat(item.item_total);
                }
            });
            this.sub_total = sub_total;        
            return `${sub_total}`;
        },

        // Total Bill Amount
        getTotalAmount(){            
            let sub_total = this.getSubTotal();            
            let late_fees = this.this_invoice.invoice_late_fees || 0 ;            
            let total_amount = parseFloat(sub_total) + parseFloat(late_fees);            
            this.total_amount = total_amount.toFixed(2);
            // return `${total_amount}`;
        },
    } 
    
}
</script>