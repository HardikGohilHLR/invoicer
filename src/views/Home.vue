<template>
    <div class="home main-container"  ref="content">
        <div class="invoice-container">
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
                            <h1>Invoice <span>#{{ invoice.id }}</span></h1>
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
                                    :disabled="invoice.from_email !== ''"
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
                                                    </span>
                                                </div>
                                            </td>
                                            <td class="item-actions">                                                
                                                <div class="form-group ">
                                                    <button><i class="fas fa-ellipsis-h"></i></button>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div class="invoice-items-footer d-flex">
                                <div class="add-item">
                                    <button v-if="invoice.invoice_items.length < 15">add item</button>
                                </div>
                                <!-- Invoice Total -->
                                <invoice-total :invoice="invoice" :invoice_options="invoice_options" :late_fee="late_fee">
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
                />

            </div>
        </div>

        <!-- Invoice Actions Popup -->
        <div id="table-invoice-actions-popup">
            <div class="table-invoice-actions" v-if="actions_item_popup">

                <button 
                    class="delete-btn" 
                    :disabled="invoice.invoice_items.length == 1"
                >
                    <i class="far fa-trash-alt"></i>
                    delete
                </button>

                <button 
                    class="disable-btn"   
                    :disabled="invoice.invoice_items.length == 1"
                    v-if="actions_item.item.disabled == false"
                >
                    <i class="fas fa-eye-slash"></i>
                    disable                                                    
                </button>

                <button 
                    class="enable-btn"  
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
// Vuelidate
import { required, minValue, email } from 'vuelidate/lib/validators';

import InvoiceOptions from '@/components/InvoiceOptions';
import InvoiceTotal from '@/components/InvoiceTotal';

export default {
    name: 'home',    
    components: {
        Datepicker,
        InvoiceOptions,
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
            google_login_details: '',
            late_fee: '',
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
    methods: {
        // Invoice Valiidation
        validateInvoice(){
            this.$v.invoice.$touch();
            if(this.$v.invoice.$error) { return; }
            return true;
        },

    },
}
</script>

