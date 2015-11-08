ServiceConfiguration.configurations.update({
    service:"facebook"
}, {
    $set: { 
        "service" : "facebook",
        "appId" : "842130802568932",
        "secret" : "817b99c819a73a351b83db33a1b50263",
        "loginStyle": "popup"
    }
});

ServiceConfiguration.configurations.update({
    service:"twitter"
}, {
    $set: { 
        "consumerKey" : "qeqTZ7Kzu9QYGeHs6qlOpVwHb",
        "secret" : "96ObFHDMpdh7EqmU8YKK6WTKSdxc2zb2GXf3EfWu0yGizwjdUe",
        "loginStyle" : "popup" 
    }
});