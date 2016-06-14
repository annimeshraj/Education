require "net/https"
require "uri"

## Support following API operation for HTTP request and response

module APIRequest

	class APIHttpWrapper

		def initialize()
            @request_header_common = {}
            @request_header_common['x-api-key'] = '$2a$16$fzVonKMEAt0176LVJiy7EO'
            @request_header_common['x-api-secret-key'] = '$2a$18$N6HFVaTnqdY/RTyQa1dCmu'
            @request_header_common['Content-Type']= 'application/json'
        end

        def do_post uri, auth_token=nil, body=nil
            if auth_token
                @request_header_common['auth_token']= auth_token;
            end
        	response =do_http_with_body(uri, Net::HTTP::Post.new(uri.request_uri, @request_header_common), body)
			puts "--------------**************-------------------"
            puts "Response #{response.code} #{response.message}: #{response.body}"
        	puts "-----------------------------------------------"
        	return response
        end

        def do_get uri, auth_token=nil # :nodoc:
            if auth_token
                @request_header_common['auth_token']= auth_token;
            end
            response = do_http(uri, Net::HTTP::Get.new(uri.request_uri, @request_header_common))
            puts "--------------**************-------------------"
            puts "Response #{response.code} #{response.message}: #{response.body}"
            puts "-----------------------------------------------"
            return response;
        end

        def do_http_with_body uri, request, body
            if body != nil
                puts "BODY : #{body.length}"
                request.body = body.to_s
                puts "body is #{request.body}"
            end            
            do_http(uri, request)
        end

        def do_http uri, request
			http = Net::HTTP.new(uri.host, uri.port)
            http.read_timeout = 86400 # 24 hours (TODO - Nitesh this value should get set based on the params)
			begin
    	        response = http.request(request)
        	    return response
	        rescue Exception => e
    	        puts e
        	    raise e
        	end
        end
	end
end
