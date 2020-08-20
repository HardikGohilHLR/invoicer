<template>
    <div class="main-loader">
        <div class="loader">
            <div class="loader-lines"></div>
            <div class="loader-inner">
                <p>i</p>
            </div>
        </div> 
    </div>
</template>

<script>
export default {
    name: 'loader'
}
</script>


<style lang="scss">
.main-loader{
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
    position: fixed;
    background: rgba(0,0,0,0.1);
    z-index: 5;
}
.loader {
    border: 4px solid transparent;
    width: 98px;
    height: 98px;
    font-family: 'Bree Serif', serif;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    overflow: hidden;
    border-radius: 19px 0 0 0;
    &::before, &::after{
        content: '';
        width: 15px;
        height: 15px;
        position: absolute;
        background: transparent;
        z-index: 2;
        border: 4px solid #1a1b1c;
        border-bottom: 0;
        border-right: 0;
        border-radius: 15px 0 0 0;
    }
    &::before{
        left: 0;
        top: 0;
    }
    &::after{
        right: 0;
        bottom: 0;
        border-radius: 0;
        transform: rotate(180deg);
    }
    p {
        font-size: 64px;
        font-family: 'Bree Serif', serif;
        line-height: 90px;
        margin: 0;
        text-transform: lowercase;
    }
}

.loader-inner {
    position: relative;
    width: 90px;
    height: 90px;
    display: flex;
    justify-content: center;
    align-items: center;
    &::before, &::after{
        content: '';
        position: absolute;
        background: #1a1b1c;        
    }
    &::before{
        top: 0;
        left: 14px;
        width: 170px;
        height: 4px;
        transform: translateX(-170px);
        animation: top_bar 2s linear infinite;
    }
    &::after{
        top: 14px;
        left: 0;
        width: 4px;
        height: 170px;
        transform: translateY(-170px);
        animation: left_bar 2s linear infinite;
    }
}
.loader-lines {
    width: 100%;
    height: 100%;
    position: absolute;
    &::before, &::after{
        content: '';
        position: absolute;
        background: #1a1b1c;        
    }
    &::before{
        bottom: 0;
        left: 0;
        width: 170px;
        height: 4px;
        transform: translateX(-170px);
        animation: top_bar 2s linear infinite 2.4s;
    }
    &::after{
        top: 0;
        right: 0;
        width: 4px;
        height: 170px;    
        transform: translateY(-170px);
        animation: left_bar 2s linear infinite 2.4s;
    }
}
@keyframes top_bar {
    100% { transform: translateX(170px); }
}
@keyframes left_bar {
    100% { transform: translateY(170px); }
}

</style>