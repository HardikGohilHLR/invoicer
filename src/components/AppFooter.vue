<template>
    <footer>
        <div class="container">
            <div>
                <p>
                    &copy; copyright {{ new Date().getFullYear() }}                
                    <a href="https://www.instagram.com/hardikgohilhlr/" target="_blank">Hardik Gohil</a>    
                </p>  
            </div>

        </div>
    </footer>
</template>

<script>
export default {
    name: 'app-footer'
}
</script>

<style lang="scss">
footer{
    position: fixed;
    bottom: 0;
    width: 100%;
    left: 0;
    background: #fff;
    padding: 15px;
}
</style>
