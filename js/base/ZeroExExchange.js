'use strict';

//  ---------------------------------------------------------------------------

const Exchange = require ('./base/Exchange');
const { ExchangeError } = require ('./base/errors');
const ZeroEx = require ('0x.js')

//  ---------------------------------------------------------------------------

module.exports = class ZeroExExchange extends Exchange {
    describe () {
        return this.deepExtend (super.describe (), {
            'id': '0x',
            'name': '0x',
            'countries': undefined,
            'enableRateLimit': false,
            'rateLimit': undefined,
            'has': {
                // Cross origin resource sharing
                // TODO: ask about this
                'CORS': false,
                'publicAPI': true,
                'privateAPI': true,
                'cancelOrder': true,
                // TODO: ask if there's a batch-cancel, pretty sure not
                'cancelOrders': false,
                'createDepositAddress': false,
                // TODO: what's createOrder (not market or limit?)
                'createOrder': false,
                // map createMarketOrder --> take market / on-chain tx
                'createMarketOrder': true,
                // and createLimitOrder --> post order to relayer
                'createLimitOrder': true,
                'deposit': false,
                'editOrder': false,
                // we can get this from eth node
                'fetchBalance': true,
                'fetchBidsAsks': false,
                'fetchClosedOrders': false,
                // this should be the list of all tokens
                'fetchCurrencies': false,
                'fetchDepositAddress': false,
                'fetchFundingFees': false,
                // funny because technically there's no L1 orderbook: only L2!
                'fetchL2OrderBook': false,
                'fetchMarkets': false,
                // comes from ETH node
                'fetchMyTrades': true,
                'fetchOHLCV': false,
                // START: the following are true for specific exchanges
                'fetchOpenOrders': false,
                'fetchOrder': false,
                'fetchOrderBook': false,
                // END
                'fetchOrderBooks': false,
                'fetchOrders': false,
                'fetchTicker': false,
                'fetchTickers': false,
                // TODO: annoying, but we could get this from node?
                // also each exchange probably just has this
                'fetchTrades': true,
                // relayer fees instead of trading fees, same idea
                'fetchTradingFees': true,
                'fetchTradingLimits': false,
                'withdraw': false,
            },
            'urls': {
                'logo': 'https://0xproject.com/images/protocol_logo_white.png',
                'api': undefined,
                'www': 'https://0xproject.com/',
                'doc': 'https://github.com/0xProject/standard-relayer-api/',
                'fees': undefined,
            },
            'api': {
                'public': {
                    'get': [
                        'token_pairs',
                        'orders',
                        'order/{orderHash}',
                        'orderbook'
                    ],
                    'post': [
                        'fees'
                    ]
                },
                'private': {
                    'post': [
                        'order'
                    ],
                },
            },
            'requiredCredentials': {
                'ethAddress':     true,
                'ethPrivateKey':  true,
                // the node that brings market-taking orders on-chain
                'ethProviderUrl': true,
                'apiKey':         false,
                'secret':         false,
                'uid':            false,
                'login':          false,
                'password':       false,
                'twofa':          false,
            },
            'markets': undefined, // TODO: fill in with trade pairs
            'currencies': {}, // TODO: fill in with trade pairs
            // each exchange could have its own OHLC
            'timeframes': undefined,
            'fees': {
                // TODO: figure out how the /fees endpoint works with this
                'trading': {
                    'tierBased': undefined,
                    'percentage': undefined,
                    'taker': undefined,
                    'maker': undefined,
                },
                'funding': {
                    'tierBased': undefined,
                    'percentage': undefined,
                    'withdraw': {},
                    'deposit': {},
                },
            },
            'parseJsonResponse': true, // whether a reply is required to be in JSON or not
            // array of http status codes which override requirement for JSON response
            'skipJsonOnStatusCodes': [
                // 400,  // bad request
                // 404,  // not found
                // 429,  // too many requests - rate limit exceeded
                // 500,  // internal server error
                // 501,  // not implemented
            ],
            'exceptions': undefined,
            'dontGetUsedBalanceFromStaleCache': true,
            'commonCurrencies': { // gets extended/overwritten in subclasses
                'ZRX':  '0x',
                'WETH': 'wETH',  // "wrapped ETH", ERC20-compliant Ether token
                'DAI':  'DAI',  // decentralised stablecoin for USD
            },
            // TODO: precision in 0x means something different
            // but check to make sure this value should be 0
            'precisionMode': 0,
        });
    }

    createLimitOrder ( ) {
      // TODO: sign order and send to relayer
    }


    cancelOrder ( ) {
      // TODO: bring order on-chain to cancel before it expires
    }
    fetchTradingFees ( ) {
      // TODO: /fees endpoint
    }

    createMarketOrder ( ) {
      // TODO: bring best orders from exchange on-chain, filling best first
      // TODO: make it very clear in docs that this is an artificial "market order",
      // and that 0x protocol has no real notion of a market order
    }

    fetchBalance ( ) {
      // TODO: get from ETH node
    }

    fetchMyTrades ( ) {
      // TODO: get from ETH node
    }

    fetchTrades ( ) {
      // TODO: get from ETH node
    }

};
