// import { PUBLIC_POCKETBASE_URL } from '$env/static/public'
import PocketBase from 'pocketbase'
import { writable } from 'svelte/store'

export const pb = new PocketBase("https://hostel.up.railway.app")

export const currentUser = writable(pb.authStore.model)