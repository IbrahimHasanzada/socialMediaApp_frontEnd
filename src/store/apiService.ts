import axiosData from "@/plugins/axiosClient";

const token = localStorage.getItem('accessToken');

const getHeaders = () => ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
});


export class AuthService {
    static async login(email: string, password: string): Promise<any> {
        try {
            const response = await axiosData.post('/auth/login', { email, password })
            localStorage.setItem('accessToken', response.data.token)
            return response.data
        } catch (error) {
            console.log('Error', error)
        }
    }
}

export class UserService {
    static async getUserById(id: string): Promise<any> {
        try {
            const response = await axiosData.get(`/user/${id}`)
            return response
        } catch (error) {
            console.log(error)
        }
    }

    static async sendFollowRequest(follower_id: string): Promise<any> {
        try {
            const response = await axiosData.post('/follow/send', { follower_id })
            return response
        } catch (error) {
            console.log(error)
        }
    }
}

export class TweetsService {
    static async allTweets(): Promise<any> {
        try {
            const response = await axiosData.get('/tweets/all')
            return response.data
        } catch (error) {
            console.log(error)
        }
    }


    static async postTweet(tweet: object): Promise<any> {
        try {
            const response = await axiosData.post('/tweets', tweet, { headers: getHeaders() })
            return response.data
        } catch (error) {
            console.log(error)
        }
    }

    static async getTweetById(tweetId: string): Promise<any> {
        try {
            const response = await axiosData.get(`/tweets/post/${tweetId}`)
            return response.data
        } catch (error) {
            console.log(error)
        }
    }

    static async getTweetByUserById(userId: string): Promise<any> {
        try {
            const response = await axiosData.get(`/tweets/${userId}`)
            return response.data
        } catch (error) {
            console.log(error)
        }
    }

    static async checkedTweet(tweetId: string): Promise<any> {
        try {
            const response = await axiosData.post('/tweets/checked', { tweetId }, { headers: getHeaders() })
            return response.data
        } catch (error) {
            console.log(error)
        }
    }

    static async likeTweet(tweetId: string): Promise<any> {
        try {
            const response = await axiosData.post('/tweets/like', { tweetId }, { headers: getHeaders() })
            console.log(response)
            return response.data
        } catch (error) {
            console.log(error)
        }
    }
}



