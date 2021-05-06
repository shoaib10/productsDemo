import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router/index';
import firebase from "firebase";
import { db } from '../main.js';

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        user: '',
        status: '',
        products: [],
        singleProduct: ''
    },
    getters: {
        getUserEmail(state) {
            return state.user = JSON.parse(localStorage.getItem('email'));
        },
        getProducts(state) {
            return state.products;
        },
        getSingleProduct(state) {
            return state.singleProduct;
        }
    },
    actions: {
        firebaseLogin(context, payload) {
            context.commit('loginRequest', payload.email);
            firebase
                .auth()
                .signInWithEmailAndPassword(payload.email, payload.password)
                .then(
                    result => {
                        if (result.user.refreshToken) {
                            localStorage.setItem('email', JSON.stringify(result.user.email));
                            localStorage.setItem('user', JSON.stringify(result.user.refreshToken));
                            context.commit('loginSuccess', payload.email);
                            this._vm.$toast.success('Login successful', {
                                position: "top-right",
                                timeout: 2000,
                                closeOnClick: true,
                                pauseOnFocusLoss: true,
                                pauseOnHover: true,
                                draggable: true,
                                draggablePercent: 0.6,
                                showCloseButtonOnHover: false,
                                hideProgressBar: true,
                                closeButton: "button",
                                icon: true,
                            })
                            router.push("/home");
                        }

                    },
                    err => {
                        this._vm.$toast.error(err.message, {
                            position: "top-right",
                            timeout: 2000,
                            closeOnClick: true,
                            pauseOnFocusLoss: true,
                            pauseOnHover: true,
                            draggable: true,
                            draggablePercent: 0.6,
                            showCloseButtonOnHover: false,
                            hideProgressBar: true,
                            closeButton: "button",
                            icon: true,
                        })

                    }
                );
        },
        AddProducts(context, payload) {
            let key = ''
            let imageUrl;
            db.collection('products').add({
                    id: '_' + Math.random().toString(36).substr(2, 9),
                    productName: payload.productName,
                    productPrice: payload.productPrice,
                    productImage: payload.productImage,
                    description: payload.description,
                })
                .then(response => {
                    key = response.id;
                    const fileName = payload.productImage;
                    const ext = fileName.slice(fileName.lastIndexOf('.'))
                    this._vm.$toast.success('Product Added successfully', {
                        position: "top-right",
                        timeout: 2000,
                        closeOnClick: true,
                        pauseOnFocusLoss: true,
                        pauseOnHover: true,
                        draggable: true,
                        draggablePercent: 0.6,
                        showCloseButtonOnHover: false,
                        hideProgressBar: true,
                        closeButton: "button",
                        icon: true,
                    })
                    router.push("/home");
                    return firebase.storage().ref('products/' + key + '.' + ext)
                        .then(filedata => {
                            imageUrl = filedata.metadata.downloadURLs[0]
                            return firebase.database().ref('products').child(key).update({ imageUrl: imageUrl })
                        }).then(() => {})
                })
                .catch(error => {
                    console.log('error', error);
                })
        },
        getProducts(context) {
            db.collection('products').get()
                .then(response => {
                    var recievedProducts = [];
                    response.forEach(item => {
                        recievedProducts.push({
                            id: item.id,
                            productName: item.data().productName,
                            productPrice: item.data().productPrice,
                            description: item.data().description
                        })
                    });
                    context.commit('recievedProducts', recievedProducts);
                })
        },
        removeProduct(context, payload) {
            db.collection('products').doc(payload.id).delete().then(() => {})
            db.collection('products').get()
                .then(response => {
                    var recievedProducts = [];
                    response.forEach(item => {
                        recievedProducts.push({
                            id: item.id,
                            productName: item.data().productName,
                            productPrice: item.data().productPrice,
                            description: item.data().description
                        })
                    });
                    context.commit('removeProducts', recievedProducts);
                    this._vm.$toast.error('Product deleted', {
                            position: "top-right",
                            timeout: 2000,
                            closeOnClick: true,
                            pauseOnFocusLoss: true,
                            pauseOnHover: true,
                            draggable: true,
                            draggablePercent: 0.6,
                            showCloseButtonOnHover: false,
                            hideProgressBar: true,
                            closeButton: "button",
                            icon: true,
                        })
                        //context.commit('removeProducts', response)
                })
        },
        editProduct(context, payload) {
            context.commit('singleProduct', payload)
            router.push("/edit");
        },
        UpdateProducts(context, payload) {
            const updateRef = db.collection('products').doc(payload.id);
            updateRef.update({ productName: payload.productName, productPrice: payload.productPrice, description: payload.description }).then(() => {
                this._vm.$toast.success('Product updated successfully', {
                    position: "top-right",
                    timeout: 2000,
                    closeOnClick: true,
                    pauseOnFocusLoss: true,
                    pauseOnHover: true,
                    draggable: true,
                    draggablePercent: 0.6,
                    showCloseButtonOnHover: false,
                    hideProgressBar: true,
                    closeButton: "button",
                    icon: true,
                })
                router.push('/home')
            })
        },
        logout(context) {
            localStorage.removeItem('email');
            localStorage.removeItem('user');
            context.commit('logout')
            this._vm.$toast.error('Logged Out', {
                position: "top-right",
                timeout: 2000,
                closeOnClick: true,
                pauseOnFocusLoss: true,
                pauseOnHover: true,
                draggable: true,
                draggablePercent: 0.6,
                showCloseButtonOnHover: false,
                hideProgressBar: true,
                closeButton: "button",
                icon: true,
            })
            router.push("/login");

        }
    },
    mutations: {
        loginRequest(state, user) {
            state.status = true;
            state.user = user;
        },
        loginSuccess(state, user) {
            state.status = true;
            state.user = user;
        },
        loginFailure(state) {
            state.status = '';
            state.user = null;
        },
        logout(state) {
            state.status = '';
            state.user = null;
        },
        recievedProducts(state, payload) {
            state.products = (payload);
        },
        removeProducts(state, payload) {
            state.products = (payload);
        },
        singleProduct(state, payload) {
            state.singleProduct = payload
        }

    },

})