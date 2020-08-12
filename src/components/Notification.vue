<template>
    <div class="notification-container">
        <div class="notification">
            <div class="notification-wpr">
                <h4>{{notification}}</h4>
            </div>
        </div>
    </div>
    
</template>

<script>

export default {
    name: 'notification',
    props: {
        notification: {
            type: String
        }
    }
}

</script>

<style lang="scss">
.invoice{
    .notification-container{
        max-width: 1110px;
        margin: 0 auto;
        width: 100%;
        margin-bottom: -20px;
        padding-top: 20px;
    }
}
.notification{
    background: #1155cc;  
    padding: 10px 20px;
    border-radius: 10px;
    h4{
        color: #fff;
        font-size: 18px;
        line-height: 30px;
    }
}
</style>