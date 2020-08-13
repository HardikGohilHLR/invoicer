<template>


    <div class="invoice main-container">

        <!-- Notification -->
        <notification :notification="notification_content" v-if="notification_content"/>
        
        <!-- Invoice -->
        <div id="invoice_print" v-if="all_completed">
            <div class="invoice-wpr">
                <div class="invoice-container">
                    <div class="invoice-details-items">

                        <div class="invoice-header border-bottom">
                            <div class="date-header">
                                <div class="invoice-main-date invoice-date d-flex-center">
                                    <p>date: <span>{{ getDate(invoice.invoice_date) }}</span></p>
                                </div>
                                <div class="invoice-due-date invoice-date d-flex-center">
                                    <p>due date: <span>{{ getDate(invoice.invoice_due_date) }}</span></p>
                                </div>
                            </div>
                            <div class="invoice-number">
                                <h1>Invoice <span>#1</span></h1>
                            </div>
                        </div>

                        <div class="invoice-body border-bottom">

                            <div class="invoice-billing-details border-bottom d-flex">
                                <div class="invoice-bill invoice-bill-from">
                                    <p>bill from</p>
                                    <div class="bill-from-details">
                                        <p><span>name: </span> {{ invoice.from_name }} </p>
                                        <p class="lowercase"><span>email: </span> {{ invoice.from_email }}</p>
                                        <p><span>address: </span> {{ invoice.from_address }}</p>
                                    </div>
                                </div>
                                
                                <div class="invoice-bill invoice-bill-to">
                                    <p>bill to</p>
                                    <div class="bill-from-details">
                                        <p><span>name: </span> {{ invoice.to_name }} </p>
                                        <p class="lowercase"><span>email: </span> {{ invoice.to_email }}</p>
                                        <p><span>address: </span> {{ invoice.to_address }}</p>
                                    </div>
                                </div>
                            </div>

                            <div class="invoice-items-wpr">
                                <div class="invoice-items border-bottom">
                                    <table>
                                        <thead class="border-bottom">
                                            <tr>
                                                <th>no.</th>
                                                <th>item</th>
                                                <th>qty</th>
                                                <th>rate</th>
                                                <th>total</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr 
                                                v-for="(item, index) in invoice.invoice_items" 
                                                :key="index"
                                                :class="{ disabled: item.disabled}"
                                            >
                                                <td class="item-number" style="width: 5%;">
                                                    <p>{{index + 1}}</p>
                                                </td>
                                                <td class="item-name" style="width: 50%;">
                                                    <p> {{ item.item_name }} </p>
                                                </td>
                                                <td class="item-qty" style="width: 10%;">
                                                    <p> {{ item.item_qty }} </p>                                                
                                                </td>
                                                <td class="item-price" style="width: 20%;">
                                                    <p> {{ item.item_price }} </p>                                                
                                                </td>
                                                <td class="item-total" style="width: 10%;">
                                                    <p> {{ item.item_total }} </p>                                                
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                                <div class="invoice-items-footer d-flex">
                                    <div class="invoice-final-amount">
                                        <div class="invoice-total-amount-wpr border-bottom">

                                            <div class="invoice-sub-total d-flex-sb">
                                                <p>subtotal</p><span>{{ invoice.invoice_options.currency.symbol }} {{ getSubTotal() }}</span>
                                            </div>

                                            <div class="invoice-sub-total invoice-late-fees d-flex-all" v-if="invoice.invoice_late_fees">
                                                <p>late fees</p>
                                                <span>
                                                    <div class="form-group d-flex-center"> {{ invoice.invoice_options.currency.symbol }} {{ invoice.invoice_late_fees }} </div>
                                                </span>
                                            </div>

                                            <div class="invoice-sub-total invoice-late-fees d-flex-all" v-if="invoice.discount">
                                                <p>discount</p>
                                                <span>
                                                    <div class="form-group d-flex-center">  {{ invoice.discount }} %</div>
                                                </span>
                                            </div>
                                            
                                            
                                        </div>

                                        <div class="invoice-total d-flex-sb">
                                            <p>total amount (in {{ invoice.invoice_options.currency.code }})</p><span>{{ invoice.invoice_options.currency.symbol }} {{ getTotalAmount() }}</span>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="invoice-notes" v-if="invoice.invoice_notes">
                            <p>notes</p>
                            <div class="form-group">
                                <span>
                                    {{ invoice.invoice_notes }}
                                </span>
                            </div>
                        </div>
                        
                        <!-- Signature -->
                        <div class="invoice-sign d-flex-all">
                            <div class="sign sign-from">
                                <div class="border-dark-bottom"></div>
                                <p>{{ invoice.from_name }}</p>
                            </div>

                            <div class="sign sign-to">
                                <div class="border-dark-bottom"></div>
                                <p>{{ invoice.to_name }}</p>
                            </div>
                        </div>

                        <!-- Print Invoice  -->
                        <div class="print-invoice">
                            <button class="btn blue-btn" @click="printInvoice">
                                <i class="fas fa-print"></i>
                                print invoice
                            </button>
                        </div>
                    </div>
                </div>
                
            </div>

        </div>

    </div>
        
</template>

<script>

import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import axios from "axios";

import Notification from "@/components/Notification.vue";

export default {
    name: 'invoice',
    components: {
        Notification
    },
    data() {
        return {
            invoice: '',
            all_completed: false, 
            notification_content: '',
        }
    },

    created(){
        let invoice_data = JSON.parse(localStorage.getItem('invoice_data'));
        this.invoice = invoice_data;
        this.all_completed = true;              
    },

    mounted(){        
        if(this.all_completed) {
            if(this.invoice.invoice_action == 'download') {                
                this.downloadInvoice();                
            } else if(this.invoice.invoice_action == 'send') {                
                this.sendInvoice();                
            }   
        }
    },

    methods: {

        // Get Sub Total
        getSubTotal(){
            let sub_total = 0;
            this.invoice.invoice_items.forEach(item => {
                if(item.disabled == false){
                    sub_total += parseFloat(item.item_total);
                }
            });   
            return `${sub_total}`;
        },

        // Total Bill Amount
        getTotalAmount(){            
            let sub_total = this.getSubTotal();            
            let late_fees = this.invoice.invoice_late_fees || 0 ;          
            let discount = this.invoice.discount || 0 ;            
            let total_amount = parseFloat(sub_total) + parseFloat(late_fees);     
            
            let price = total_amount - ( total_amount * discount / 100 );
            
            total_amount = price.toFixed(2);       
            return `${total_amount}`;
        },

        // Date Format
        getDate(date){
            return new Date(date).toLocaleDateString('en-US', {
                year: 'numeric', month: 'long', day: 'numeric'
            });
        },

        // Print Invoice
        printInvoice(){                  
            document.querySelector('.invoice-wpr').classList.add('invoice-print');

            this.$htmlToPaper('invoice_print', null, () => {
                document.querySelector('.invoice-wpr').classList.remove('invoice-print');
            });
        },  

        // Download Invoice 
        downloadInvoice(){
            this.generatePDF('download'); 
        },
        
        // Send Invoice 
        sendInvoice(){
            this.generatePDF('send');
        },

        generatePDF(type){
            var element = document.querySelector('.invoice-details-items');  
            document.querySelector('.invoice-wpr').classList.add('invoice-download');

            html2canvas(element, {scale: 6}).then(canvas => {
                canvas.getContext('2d');          
    
                var img = canvas.toDataURL("image/jpeg", 1.0);

                var hratio = canvas.height / canvas.width;

                var pdf = new jsPDF('p','px', 'a4');                
                var width = pdf.internal.pageSize.width - 10; 
                var height = width * hratio;                    
                var totalPDFPages = 1;

                if(hratio > 1.5) {
                    totalPDFPages = Math.ceil(hratio);  
                }

                pdf.addImage(img,'JPEG',0,15, width, height);

                for (var i = 1; i < totalPDFPages; i++) {                       
                    pdf.addPage('a4');
                    pdf.addImage(img, 'JPEG', 0, -(pdf.internal.pageSize.height * i) + 15, width, height);                    
                }

                if(type == 'download') {
                    // Download Invoice
                    pdf.save('file.pdf', {returnPromise:true}).then(() => {    
                        document.querySelector('.invoice-wpr').classList.remove('invoice-download');
                    });

                } else {
                    // Send Invoice
                    let session_details = '';
                    if (this.$session.exists()) {
                        session_details = this.$session.getAll();
                    } 
                    var pdf_file = pdf.output('datauristring');    

                    this.all_completed = false; 
                    // axios.post('http://localhost:3001/send_invoice', {
                    axios.post('https://invoice-builder-vue.herokuapp.com/send_invoice', {
                        'pdf_content': pdf_file,
                        'invoice': this.invoice,
                        'session_details': session_details 
                    }).
                    then((res) => {                        
                        this.all_completed = true; 
                        if(res.data.isError == false) {                        
                            this.notification_content = res.data.msg;
                        } else {       
                            console.log(res.data);
                            
                            this.notification_content = 'Please try again after sometimes...';        
                        }
                    })
                }
                            
                document.querySelector('.invoice-wpr').classList.remove('invoice-download');

            });
        }
    }
}
</script>

