<template>
    <div class="home main-container" ref="content">

        <loader v-if="loader"/>

        <div class="invoice-container" v-else>
            <div class="invoice-container-wpr">

                <div class="invoice-details-items">
                    <div class="invoice-header border-bottom">
                        <div class="date-header">
                            <div class="invoice-main-date invoice-date d-flex-center">
                                <p>date:</p>
                                <div class="date-picker">
                                    <datepicker v-model="invoice.invoice_date" :format="date_format" :disabledDates="invoice_date_disabled"></datepicker>
                                </div>
                                <i class="fad fa-sort-up"></i>
                            </div>

                            <div class="invoice-due-date invoice-date d-flex-center">
                                <p>due date:</p>
                                <div class="date-picker">
                                    <datepicker v-model="invoice.invoice_due_date" :format="date_format" :disabledDates="invoice_due_date_disabled"></datepicker>
                                </div>
                                <i class="fad fa-sort-up"></i>
                            </div>

                        </div>

                        <div class="invoice-number">
                            <!-- <h1>Invoice <span>#{{ invoice.id }}</span></h1> -->
                            <img src="../assets/images/invoicia.svg"/>
                        </div>
                    </div>


                    <div class="invoice-body border-bottom">
                        
                        <div class="invoice-billing-details border-bottom d-flex">
                            <div class="invoice-bill invoice-bill-from">
                                <p>bill from</p>
                                
                                <div class="form-group">
                                    <input type="text" name="from-name" placeholder="Name" v-model="invoice.from_name" 
                                    :class="{ 'input_error': $v.invoice.from_name.$error }"
                                    >
                                </div>

                                <div class="form-group">
                                    <input type="email" name="from-email" placeholder="Email" v-model="invoice.from_email" 
                                    :class="{ 'input_error': $v.invoice.from_email.$error }" 
                                    >
                                </div>

                                <div class="form-group">
                                    <textarea name="from-address" placeholder="Address" rows="5" v-model="invoice.from_address" 
                                    :class="{ 'input_error': $v.invoice.from_address.$error }"></textarea>
                                </div>

                            </div>
                            <div class="invoice-bill invoice-bill-to">
                                <p>bill to</p>
                                
                                <div class="form-group">
                                    <input type="text" name="to-name" placeholder="Name" v-model="invoice.to_name" 
                                    :class="{ 'input_error': $v.invoice.to_name.$error }">
                                </div>

                                <div class="form-group">
                                    <input type="email" name="to-email" placeholder="Email" v-model="invoice.to_email"
                                    :class="{ 'input_error': $v.invoice.to_email.$error }">
                                </div>

                                <div class="form-group">
                                    <textarea name="to-address" placeholder="Address" rows="5" v-model="invoice.to_address" 
                                        :class="{ 'input_error': $v.invoice.to_address.$error }">
                                    </textarea>
                                </div>

                            </div>
                        </div>

                        <div class="invoice-items-wpr">
                            <div class="invoice-items border-bottom">
                                <table>
                                    <thead class="border-bottom">
                                        <tr>
                                            <th>item</th>
                                            <th>qty</th>
                                            <th>rate</th>
                                            <th>total</th>
                                            <th>action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(item, index) in invoice.invoice_items" :key="index" :class="{disabled: item.disabled}">
                                            <td class="item-name" style="width: 45%">
                                                <div class="form-group ">
                                                    <input type="text" v-model="invoice.invoice_items[index].item_name" placeholder="Item Name" 
                                                        :class="{'input_error': $v.invoice.invoice_items.$each[index].item_name.$error}"
                                                    >
                                                </div>
                                            </td>
                                            <td class="item-qty" style="width: 10%">
                                                <div class="form-group ">
                                                    <input type="number" id="item_qty" v-model="invoice.invoice_items[index].item_qty" placeholder="1"
                                                    >
                                                </div>
                                            </td>
                                            <td class="item-price" style="width: 15%">
                                                <div class="form-group ">
                                                    <i class="far fa-usd-circle"></i>
                                                    <input type="number" v-model="invoice.invoice_items[index].item_price" placeholder="0.00"
                                                        :class="{'input_error': $v.invoice.invoice_items.$each[index].item_price.$error}"
                                                        >
                                                </div>
                                            </td>
                                            <td class="item-total" style="width: 20%">
                                                <div class="form-group ">
                                                    <span>
                                                        {{ invoice_options.currency.symbol }} 
                                                        {{ invoice.invoice_items[index].item_total = getItemTotal(invoice.invoice_items[index].item_qty, invoice.invoice_items[index].item_price) }}
                                                    </span>
                                                </div>
                                            </td>
                                            <td class="item-actions">                                                
                                                <div class="form-group ">
                                                    <button @click="invoiceActions($event, item, index)"><i class="fas fa-ellipsis-h"></i></button>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div class="invoice-items-footer d-flex">
                                <div class="add-item">
                                    <button @click="addItem" v-if="invoice.invoice_items.length < 15">add item</button>
                                    <button @click="addDiscount">{{ invoice_discount ? 'remove' : 'add' }} discount</button>
                                </div>
                                <!-- Invoice Total -->
                                <invoice-total :invoice="invoice" :invoice_options="invoice_options" :late_fee="late_fee" :discount="invoice.discount">
                                    <div 
                                        class="invoice-sub-total invoice-late-fees d-flex-all" 
                                        v-if="invoice_extra.includes('invoice_late_fees')"
                                    >
                                        <p>late fees</p>
                                        <span>                                              
                                            <div class="form-group d-flex-center">                                                
                                                {{ invoice_options.currency.symbol }} 
                                                <input type="number" v-model="invoice.invoice_late_fees" @keyup="updateLateFees()"/>
                                            </div>
                                        </span>                            
                                    </div>

                                    <div class="invoice-sub-total invoice-discount d-flex-all" v-if="invoice_discount" >
                                        <p>discount (in %)</p>
                                        <span>                                              
                                            <div class="form-group d-flex-center">         
                                                <input type="number" v-model="invoice.discount" @keyup="discountUpdate"/>
                                            </div>
                                        </span>                            
                                    </div>

                                </invoice-total>
                                
                                <!-- / Invoice Total -->

                            </div>
                        </div>
                    </div>

                    <div class="invoice-notes" v-if="invoice_extra.includes('invoice_notes')">
                        <p>notes</p>
                        <div class="form-group">
                            <textarea name="invoice-notes" placeholder="Message" v-model="invoice.invoice_notes"></textarea>
                        </div>
                    </div>
                </div>

                <!-- Invoice Options -->
                <invoice-options 
                    :invoice="invoice" 
                    @invoiceOptionsUpdated="invoiceOptionsUpdated" 
                    @sendInvoice="sendInvoice"
                    @previewInvoice="previewInvoice"
                    @downloadInvoice="downloadInvoice"
                />

            </div>
        </div>

        <!-- Invoice Actions Popup -->
        <div id="table-invoice-actions-popup">
            <div class="table-invoice-actions" v-if="actions_item_popup">

                <button 
                    class="delete-btn" 
                    @click="deleteInvoiceItem(actions_item)" 
                    :disabled="invoice.invoice_items.length == 1"
                >
                    <i class="far fa-trash-alt"></i>
                    delete
                </button>

                <button 
                    class="disable-btn"  
                    @click="disableInvoiceItem(actions_item)" 
                    :disabled="invoice.invoice_items.length == 1"
                    v-if="actions_item.item.disabled == false"
                >
                    <i class="fas fa-eye-slash"></i>
                    disable                                                    
                </button>

                <button 
                    class="enable-btn"  
                    @click="enableInvoiceItem(actions_item)" 
                    v-if="actions_item.item.disabled == true"
                >
                    <i class="fas fa-eye"></i>
                    enable                                                    
                </button>
            </div>
        </div>
  
    </div>
</template>

<script>
// Date Picker
import Datepicker from 'vuejs-datepicker';
// Popup
import { createPopper } from '@popperjs/core';
// Vuelidate
import { required, minValue, email } from 'vuelidate/lib/validators';

import InvoiceOptions from '@/components/InvoiceOptions';
import InvoiceTotal from '@/components/InvoiceTotal';
import Loader from '@/components/Loader';

export default {
    name: 'home',    
    components: {
        Datepicker,
        InvoiceOptions,
        Loader,
        InvoiceTotal,
    },
    data() {
        return {
            // Disabled Dates
            invoice_date_disabled: { to: new Date() },
            invoice_due_date_disabled: { to: new Date() },
            date_format: 'dd/MM/yyyy',
            // Invoice Details
            invoice_items: 1,
            invoice: {
                id: 1,
                invoice_date: new Date(),
                invoice_due_date: new Date(),
                from_name: '',
                to_name: '',
                from_email: '',
                from_address: '',
                to_email: '',
                to_address: '',
                discount: '',

                invoice_items: [
                    {
                        item_id: 1,
                        item_name: '',
                        item_qty: "1",
                        item_price: null,
                        item_total: null,
                        disabled: false
                    }
                ]
            },
            invoice_discount: false,
            invoice_complete: false,
            invoice_options: { 
                currency: { code: "INR", name: "Indian rupee", symbol: "₹", flag: "https://restcountries.eu/data/ind.svg" },
                invoice_extras: [
                    { name: 'invoice_late_fees', is_added: false},
                    { name: 'invoice_notes', is_added: false}      ,              
                ]
            }, 
            invoice_extra: [],  
            currencies: [],
            // Invoice Actions
            actions_item_popup: false,
            actions_item: '',
            sub_total: 0,
            total_amount: 0,
            late_fee: '',
            loader: true,
        }
    }, 

    validations: {
        invoice: {
            from_name: { required, },
            to_name: { required, },
            from_email: { required, email }, 
            from_address: { required,  },
            to_email: { required, email },
            to_address: { required, },
            invoice_items: {
                $each: {
                    item_name: { required },
                    item_price: { required, minValue: minValue(1) },
                }
            }
        }
    },

    created(){
        setTimeout(() => {
            this.loader = false;            
        }, 2000);
    },

    methods: {
        
        // Add Item
        addItem(){  
            this.invoice_items++;
            this.invoice.invoice_items.push({       
                item_id: this.invoice_items,      
                item_name: '',
                item_qty: 1,
                item_price: null,
                item_total: 0.00, 
                disabled: false                    
            });
        },

        // Add Discount
        addDiscount(){
            this.invoice_discount = !this.invoice_discount;

            if (!this.invoice_discount) {
                this.invoice.discount = '';
            }
        },

        discountUpdate(){
            this.invoice.discount = this.invoice.discount > 100 ? 100 : this.invoice.discount;
            this.invoice.discount = this.invoice.discount <= 0 ? this.invoice.discount = 0 : this.invoice.discount;
        },
        
        // Late Fess Update
        updateLateFees(){
            this.late_fee = this.invoice.invoice_late_fees;
        },   
        
        // Invoice Options Updated
        invoiceOptionsUpdated(options){     

            this.invoice_options.currency = options.currency;

            // Add Dynamic Property            
            this.invoice_options.invoice_extras.forEach(value => {
                value.is_added = options.invoice_extras.includes(value.name) ? true : false;
            });        

            let values = [];
            this.invoice_options.invoice_extras.forEach(value => {
                if(value.is_added) {
                    values.push(value.name);              
                    this.invoice_extra = values;
                    if(!this.invoice[value.name]){
                        this.invoice[value.name] = null;
                    }
                } else {
                    delete this.invoice[value.name];                    
                    var index = this.invoice_extra.indexOf(value.name);
                    if (index !== -1) this.invoice_extra.splice(index, 1);
                    this.updateLateFees();
                }
            }); 
            
        },

        // Get Item Total 
        getItemTotal(qty, price){
            let item_total = qty * price;
            return parseFloat(item_total).toFixed(2);
        },
        
        // Invoice Actions
        invoiceActions($event, item, index){  
            if(this.actions_item.index == index) {
                this.hidePopup();   
            } else {                
                // Tooltip
                const tooltip = document.querySelector('#table-invoice-actions-popup');
    
                this.actions_item = {
                    index,
                    item
                };    
                this.actions_item_popup = true;            
    
                createPopper($event.target, tooltip, {
                    placement: 'bottom',
                });  
            }
        },

        hidePopup(){
            this.actions_item = '';    
            this.actions_item_popup = false;    
        },

        // Delete Invoice Item
        deleteInvoiceItem(item){
            if(this.invoice.invoice_items.length > 1) {
                this.invoice.invoice_items.splice(item.index, 1);
                this.hidePopup();
            }

            this.invoice.invoice_items.forEach((value, index) => {
                value.item_id = index + 1;                
            });
           
        },

        // Disable Invoice Item
        disableInvoiceItem(item){
            item.item.disabled = true;
            this.hidePopup();
        },
        
        // Enable Invoice Item
        enableInvoiceItem(item){
            item.item.disabled = false;
            this.hidePopup();
        },        

        // Invoice Valiidation
        validateInvoice(){
            this.$v.invoice.$touch();
            if(this.$v.invoice.$error) { return; }
            return true;
        },

        // Send Invoice
        sendInvoice(data){
            // Validate invoice
            this.previewInvoice(data);
        },

        // Preview Invoice
        previewInvoice(data){            
            // Validate invoice
            if(this.validateInvoice()) {

                let invoice = this.invoice;
                invoice.invoice_options = this.invoice_options;
                invoice.invoice_action = data;

                // Store Invoice in storage
                localStorage.setItem('invoice_data', JSON.stringify(invoice));
                // Route
                let route = this.$router.resolve({ name: 'invoice', params: { invoice: this.invoice } });
                window.open(route.href, '_blank');
            }
        },
        
        // Download Invoice
        downloadInvoice(data) {
            this.previewInvoice(data);
        },
    },
}
</script>

