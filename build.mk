TAG ?= latest
UNIQUE_TAG ?= $(TAG)

REGISTRY_SERVER ?=
CACHE_IMAGE ?= $(REGISTRY_SERVER)/build-cache/shop/web

PUSH ?= false

ifeq (true, $(PUSH))
	_output := --push
else
    _output := --load
endif

ifneq (,$(LOCAL_CACHE_PATH))
	_cache := --set *.cache-from=type=local,src=$(LOCAL_CACHE_PATH) --set *.cache-to=type=local,dest=$(LOCAL_CACHE_PATH)
endif

docker-build: docker-build-api docker-build-web

docker-build-%:
	@$(MAKE) -s docker-bake TARGET=$*

docker-bake:
	docker buildx bake -f docker-bake.hcl $(_output) $(_cache) $(TARGET)
